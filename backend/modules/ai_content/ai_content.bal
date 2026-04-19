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

import ballerina/log;
import ballerina/http;

configurable GeminiConfig geminiConfig = ?;

public function generateSearchSummary(string query, json[] searchResults) returns string|error {
    // Build a readable version of the results for the prompt
    string resultsText = "";
    int count = 1;
    foreach json result in searchResults {
        resultsText += string `Result ${count}: ${result.toString()}\n`;
        count += 1;
        if count > 5 { break; } // Limit to top 5 results to stay within token limits
    }

    // The prompt / instruction we send to Gemini
    string prompt = string `You are a helpful search assistant. 
A user searched for: "${query}"

Here are the top search results:
${resultsText}

Create a concise summary using HTML bullet points.

Requirements:
- Return ONLY valid HTML without any explanations or extra text.
- Use <ul> and <li> tags for the bullet list.
- Wrap each bullet's main topic in <strong> tags.
- Create 5–7 bullet points.
- Each bullet should have a short title and a brief description (1–2 sentences max).
- Do not use markdown formatting such as **bold** or * bullets.
- Do not repeat information.

HTML Summary:`;

    // Build the request body
    GeminiRequest requestBody = {
        contents: [{
            parts: [{ text: prompt }]
        }]
    };

    // Call Gemini API
    string apiUrl = string `/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${geminiConfig.apiKey}`;

    GeminiResponse|http:Error response = geminiClient->post(apiUrl, requestBody, targetType = GeminiResponse);

    if response is http:Error {
        log:printError("Gemini API call failed", response);
        return error("Failed to generate summary");
    }

    // Extract the text from the response
    if response.candidates.length() > 0 {
        GeminiContent content = response.candidates[0].content;
        if content.parts.length() > 0 {
            return content.parts[0].text;
        }
    }

    return error("No summary generated");
}