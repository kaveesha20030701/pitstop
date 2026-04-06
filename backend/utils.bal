// Copyright (c) 2026 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import pitstop.entity;
import pitstop.types;
import ballerina/cache;
import ballerina/log;

final cache:Cache emailValidationCache = new ({
    capacity: 500,
    defaultMaxAge: 1800.0,
    cleanupInterval: 86400.0
});

# Replace hyphens with spaces, trim the string, and make it lowercase..
#
# + input - string to replace with hyphens
# + return - updated string 
isolated function replaceSpacesWithHyphens(string input) returns string =>
    re `\s+(?:-\s+)*`.replaceAll(input.trim().toLowerAscii(), "-");

# Replace the {{appName}} placeholder in the email template with the actual app name.
#
# + template - email template containing the {{appName}} placeholder
# + appName - actual application name to replace the placeholder with
# + return - email template with the {{appName}} placeholder replaced by the actual app name
isolated function renderAppName(string template, string appName) returns string =>
    re `\{\{appName\}\}`.replaceAll(template, appName);

# Creating a route tree from a flat list.
#
# + allRoutes - Flat list of routes
# + return - Root routes with nested children
public isolated function buildRouteTree(types:Route[] allRoutes) returns types:RouteResponse[] {
    map<types:RouteResponse> routeMap =
        map from types:Route route in allRoutes
    let string key = route.routeId.toString()
    let types:RouteResponse value = {
        routeId: route.routeId,
        path: route.path,
        menuItem: route.menuItem,
        routeOrder: route.routeOrder,
        children: [],
        isRouteVisible: route.isRouteVisible
    }
    select [key, value];

    types:RouteResponse[] rootNodes = [];

    foreach types:Route route in allRoutes {
        string parentKey = route.parentId.toString();
        string childKey = route.routeId.toString();

        if route.parentId == 1 && routeMap.hasKey(childKey) {
            rootNodes.push(<types:RouteResponse>routeMap.get(childKey));
        } else if routeMap.hasKey(parentKey) && routeMap.hasKey(childKey) {
            types:RouteResponse parentRoute = routeMap.get(parentKey);
            types:RouteResponse childRoute = routeMap.get(childKey);
            parentRoute.children.push(childRoute);
        }
    }

    return rootNodes;
}

# Validate mentioned email against employee directory using Ballerina cache.
#
# + email - Email to validate
# + return - true if employee exists, false if not found, error on unexpected failure
public function validateMentionedEmailExists(string email) returns boolean|error {
    if emailValidationCache.hasKey(email) {
        boolean|error cachedValue = <boolean|error>emailValidationCache.get(email);
        if cachedValue is boolean {
            return cachedValue;
        }
        log:printWarn("Error occurred while reading the cache", cachedValue);
    }

    entity:Employee|error employee = entity:getEmployee(email);
    boolean exists = employee !is error;

    error? cacheErr = emailValidationCache.put(email, exists, 1800.0);

    if cacheErr is error {
        log:printWarn("Error occurred while updating the cache", cacheErr);
    }
    return exists;
}
