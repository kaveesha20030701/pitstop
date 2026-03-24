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

import { Box, Button, alpha } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { enqueueSnackbarMessage } from "@slices/commonSlice/common";
import { getPageData } from "@slices/pageSlice/page";
import { updateRouterPath } from "@slices/routeSlice/route";
import { RootState, useAppDispatch, useAppSelector } from "@slices/store";
import { Role } from "@utils/types";
import { RouteResponse,} from "@/types/types";

const ButtonSection = () => {
  const { childrenRoutes } = useAppSelector((state: RootState) => state.route);
  const authorizedRoles = useAppSelector((state: RootState) => state.auth.roles);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToRoute = (route: RouteResponse) => {
    if (
      (route.isRouteVisible === false || route.isRouteVisible === undefined) &&
      !authorizedRoles.includes(Role.SALES_ADMIN)
    ) {
      dispatch(
        enqueueSnackbarMessage({
          message: "This page is currently hidden.",
          type: "warning",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        }),
      );
      return;
    }
    navigate(route.path);
    dispatch(
      updateRouterPath({
        routeId: route.routeId,
        currentPath: route.path,
        label: route.menuItem,
        children: route.children ?? [],
      }),
    );
    dispatch(getPageData(route.path));
  };

  const combinedItems = [
    ...childrenRoutes.map((r) => ({ ...r, type: "route" })),
  ];

  return (
    <>
      <Box
        sx={(theme) => ({
          paddingX: 4,
          paddingY: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          background:
            theme.palette.mode === "dark"
              ? alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity)
              : alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        })}
      >
        {combinedItems.map((item, index) => {
          const label = item.menuItem;

          return (
            <Button
              key={index}
              variant="outlined"
              onClick={() =>
                navigateToRoute(item)
              }
              sx={(theme) => ({
                borderRadius: 3,
                whiteSpace: "nowrap",
                textTransform: "uppercase",
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                fontWeight: 600,
              })}
            >
              {label}
            </Button>
          );
        })}
      </Box>
    </>
  );
};

export default ButtonSection;
