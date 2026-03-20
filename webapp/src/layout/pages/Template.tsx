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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FolderIcon from "@mui/icons-material/Folder";
import LinkIcon from "@mui/icons-material/Link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grow,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  useTheme,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { RouteResponse, ContentResponse } from "src/types/types";

import React, { useState, useEffect, useMemo } from "react";

import ErrorHandler from "@components/common/ErrorHandler";
import DeleteContentDialogBox from "@components/dialogs/DeleteDialogBox";
import RouteContentDialogBox from "@components/dialogs/RouteContentDialogBox";
import ActionButton from "@components/ui/page/ActionButton";
import { enqueueSnackbarMessage } from "@slices/commonSlice/common";
import { createNewContent, updateContent } from "@slices/pageSlice/page";
import { RootState, useAppDispatch, useAppSelector } from "@slices/store";
import { Role } from "@utils/types";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import GridSortableItem from "@components/common/GridSortableItem";

export default function ActionAreaCard() {
  const page = useAppSelector((state: RootState) => state.page);
  const {
    childrenRoutes,
    routeId: currentRouteId,
    currentPath,
  } = useAppSelector((state: RootState) => state.route);
  const authorizedRoles = useAppSelector((state: RootState) => state.auth.roles);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedContent, setSelectedContent] = useState<ContentResponse | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));
  const [orderedRouteContents, setOrderedRouteContents] = useState<
    ContentResponse[]
  >([]);

  const currentRouteContents = useMemo(() => {
    return (page.contents || [])
      .filter((c) => c.routeId === currentRouteId && c.description)
      .sort((a, b) => a.contentOrder - b.contentOrder);
  }, [page.contents, currentRouteId]);

  useEffect(() => {
    setOrderedRouteContents(currentRouteContents);
  }, [currentRouteContents]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIdx = orderedRouteContents.findIndex(
      (c) => c.contentId.toString() === active.id
    );
    const newIdx = orderedRouteContents.findIndex(
      (c) => c.contentId.toString() === over.id
    );

    if (oldIdx < 0 || newIdx < 0) return;

    const newOrder = [...orderedRouteContents];
    const [moved] = newOrder.splice(oldIdx, 1);
    newOrder.splice(newIdx, 0, moved);
    setOrderedRouteContents(newOrder);

    dispatch(
      updateContent({
        contentId: newOrder[0].contentId,
        content: {
          reorderContents: newOrder.map((c, i) => ({
            contentId: c.contentId,
            contentOrder: i + 1,
          })),
        },
        routePath: window.location.pathname,
      })
    );
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, content: ContentResponse) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedContent(content);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigateToRoute = (route: RouteResponse) => {
    if (
      (route.isRouteVisible === false || route.isRouteVisible === undefined) &&
      !authorizedRoles.includes(Role.SALES_ADMIN)
    ) {
      dispatch(
        enqueueSnackbarMessage({
          message: "This page is currently hidden.",
          type: "warning",
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
        }),
      );
      return;
    }
    if (route.path === currentPath) {
      return;
    }

    navigate(route.path);
  };

  const openContent = (content: ContentResponse) => {
    if (content.contentLink) {
      window.open(content.contentLink, "_blank");
    }
  };

  const combinedItems = [
    ...childrenRoutes.map((r) => ({ ...r, type: "route" })),
    ...currentRouteContents.map((c) => ({ ...c, type: "content" })),
  ];

  const isVisibleRaw = page.pageData?.isVisible;
  const showSubpages = isVisibleRaw === undefined ? true : !!isVisibleRaw;

  return (
    <Box>
      {page.pageDataState === "success" && (
        <Grow in>
          <Box
            sx={{
              minHeight: "45vh",
              background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}08 100%)`,
              padding: { xs: "24px 16px", sm: "40px 24px", md: "60px 40px" },
              position: "relative",
            }}
          >
            {/* Action Buttons */}
            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <ActionButton direction="left" />
              <ActionButton direction="right" />
            </Box>

            {/* Header Section */}
            <Box
              sx={{
                maxWidth: "1400px",
                margin: "0 auto 32px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mt: 2,
                  mb: 2,
                  color: theme.palette.text.primary,
                  ...page.pageData.customPageTheme?.title,
                }}
              >
                {page.pageData.title}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: "700px",
                  margin: "0 auto",
                  fontSize: "1.05rem",
                  ...page.pageData.customPageTheme?.description,
                }}
              >
                {page.pageData.description}
              </Typography>
            </Box>

            {/* Grid of Cards  */}
            {showSubpages && (
             <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
              <Box sx={{ maxWidth: "1400px", margin: "0 auto", pb: 6 }}>
                <SortableContext
                  items={orderedRouteContents.map((c) => c.contentId.toString())}
                  strategy={rectSortingStrategy}
                >
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  spacing={2}
                  justifyContent="center"
                  alignItems="stretch"
                  sx={{
                    gap: 2,
                    "& > *": {
                      flexBasis: {
                        xs: "100%",
                        sm: "calc(50% - 8px)",
                        md: "calc(33.333% - 10.667px)",
                        lg: "calc(16.666% - 13.333px)",
                      },
                      minWidth: {
                        xs: "100%",
                        sm: "min(calc(50% - 8px), 280px)",
                        md: "min(calc(33.333% - 10.667px), 240px)",
                        lg: "min(calc(16.666% - 13.333px), 200px)",
                      },
                      maxWidth: {
                        xs: "100%",
                        sm: "300px",
                        md: "280px",
                        lg: "220px",
                      },
                    },
                  }}
                >
                  {combinedItems.map((item, index) => {
                    const isContent = item.type === "content";
                    const label =
                      "menuItem" in item ? item.menuItem : (item.description ?? "Unnamed");
                    const isActive = !isContent && "path" in item && item.path === currentPath;

                    const cardContent = (
                      <Box key={index}>
                        <Card
                          sx={(t) => ({
                            background:
                              t.palette.mode === "dark"
                                ? `linear-gradient(135deg, ${alpha(
                                    t.palette.primary.main,
                                    0.15,
                                  )} 0%, ${alpha(t.palette.warning.main, 0.08)} 100%)`
                                : `linear-gradient(135deg, ${alpha(
                                    t.palette.primary.main,
                                    0.08,
                                  )} 0%, ${alpha(t.palette.warning.main, 0.05)} 100%)`,
                            backdropFilter: "blur(16px) saturate(150%)",
                            WebkitBackdropFilter: "blur(16px) saturate(150%)",
                            borderRadius: 6,
                            border: `1px solid ${alpha(
                              t.palette.mode === "dark"
                                ? t.palette.primary.light
                                : t.palette.primary.main,
                              t.palette.mode === "dark" ? 0.2 : 0.15,
                            )}`,
                            boxShadow:
                              t.palette.mode === "dark"
                                ? "0 8px 32px rgba(0,0,0,0.4)"
                                : "0 8px 24px rgba(0,0,0,0.12)",
                            height: "100%",
                            position: "relative",
                            transition:
                              "transform .3s ease, box-shadow .3s ease, border-color .3s ease, background .3s ease",
                            borderColor: isActive ? t.palette.primary.main : undefined,
                            "&:hover": {
                              transform: "translateY(-4px) scale(1.02)",
                              boxShadow:
                                t.palette.mode === "dark"
                                  ? `0 16px 40px ${alpha(t.palette.primary.main, 0.3)}`
                                  : `0 16px 32px ${alpha(t.palette.primary.main, 0.2)}`,
                              borderColor: t.palette.primary.main,
                              background:
                                t.palette.mode === "dark"
                                  ? `linear-gradient(135deg, ${alpha(
                                      t.palette.primary.main,
                                      0.25,
                                    )} 0%, ${alpha(t.palette.warning.main, 0.15)} 100%)`
                                  : `linear-gradient(135deg, ${alpha(
                                      t.palette.primary.main,
                                      0.15,
                                    )} 0%, ${alpha(t.palette.warning.main, 0.1)} 100%)`,
                            },
                          })}
                        >
                          <CardActionArea
                            onClick={() =>
                              isContent
                                ? openContent(item as ContentResponse)
                                : navigateToRoute(item as RouteResponse)
                            }
                            sx={{ height: "100%" }}
                          >
                            <CardContent
                              sx={{
                                height: 100,
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={(t) => ({
                                  width: 40,
                                  height: 40,
                                  borderRadius: 10,
                                  backgroundColor: isActive
                                    ? t.palette.primary.main
                                    : t.palette.mode === "dark"
                                      ? alpha(t.palette.primary.light, 0.3)
                                      : alpha(t.palette.primary.main, 0.15),
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  transition: "all .3s ease",
                                  boxShadow: isActive
                                    ? `0 4px 12px ${alpha(t.palette.primary.main, 0.4)}`
                                    : "none",
                                })}
                              >
                                {isContent ? (
                                  <LinkIcon
                                    sx={{ fontSize: 22, color: theme.palette.primary.main }}
                                  />
                                ) : (
                                  <FolderIcon
                                    sx={{ fontSize: 22, color: theme.palette.primary.main }}
                                  />
                                )}
                              </Box>

                              <Typography
                                variant="subtitle2"
                                sx={{
                                  fontWeight: 600,
                                  textAlign: "center",
                                  lineHeight: 1.25,
                                }}
                              >
                                {label}
                              </Typography>

                              {isActive && (
                                <Box
                                  sx={(t) => ({
                                    position: "absolute",
                                    top: 6,
                                    right: 6,
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    backgroundColor: t.palette.primary.main,
                                  })}
                                />
                              )}
                            </CardContent>
                          </CardActionArea>

                          {/* Menu Button for Content */}
                          {isContent && authorizedRoles.includes(Role.SALES_ADMIN) && (
                            <IconButton
                              size="small"
                              onClick={(e) => handleMenuOpen(e, item as ContentResponse)}
                              sx={{
                                position: "absolute",
                                top: 6,
                                right: 6,
                                backgroundColor: "rgba(0,0,0,0.04)",
                                "&:hover": {
                                  backgroundColor: "rgba(0,0,0,0.08)",
                                },
                              }}
                            >
                              <MoreVertIcon fontSize="small" />
                            </IconButton>
                          )}
                        </Card>
                      </Box>
                    );


                        return (
                          <Box
                            key={index}
                            sx={{
                              flexBasis: {
                                xs: "100%",
                                sm: "calc(50% - 8px)",
                                md: "calc(33.333% - 10.667px)",
                                lg: "calc(16.666% - 13.333px)",
                              },
                              minWidth: {
                                xs: "100%",
                                sm: "min(calc(50% - 8px), 280px)",
                                md: "min(calc(33.333% - 10.667px), 240px)",
                                lg: "min(calc(16.666% - 13.333px), 200px)",
                              },
                              maxWidth: {
                                xs: "100%",
                                sm: "300px",
                                md: "280px",
                                lg: "220px",
                              },
                            }}
                          >
                            {isContent && authorizedRoles.includes(Role.SALES_ADMIN) ? (
                              <GridSortableItem
                                id={(item as ContentResponse).contentId.toString()}
                                disabled={false}
                                dragHandlePosition="top-left"
                              >
                                {cardContent}
                              </GridSortableItem>
                            ) : (
                              cardContent
                            )}
                          </Box>
                        );
                  })}

                  {/* Add New Card - only when admin */}
                  {authorizedRoles.includes(Role.SALES_ADMIN) && (
                    <Box>
                      <Card
                        sx={(t) => ({
                          background:
                            t.palette.mode === "dark"
                              ? `linear-gradient(135deg, ${alpha(
                                  t.palette.primary.main,
                                  0.15,
                                )} 0%, ${alpha(t.palette.warning.main, 0.08)} 100%)`
                              : `linear-gradient(135deg, ${alpha(
                                  t.palette.primary.main,
                                  0.08,
                                )} 0%, ${alpha(t.palette.warning.main, 0.05)} 100%)`,
                          backdropFilter: "blur(16px) saturate(150%)",
                          WebkitBackdropFilter: "blur(16px) saturate(150%)",
                          borderRadius: 6,
                          border: `1px solid ${alpha(
                            t.palette.mode === "dark"
                              ? t.palette.primary.light
                              : t.palette.primary.main,
                            t.palette.mode === "dark" ? 0.2 : 0.15,
                          )}`,
                          boxShadow:
                            t.palette.mode === "dark"
                              ? "0 8px 32px rgba(0,0,0,0.4)"
                              : "0 8px 24px rgba(0,0,0,0.12)",
                          height: "100%",
                          position: "relative",
                          "&:hover": {
                            transform: "translateY(-4px) scale(1.02)",
                            boxShadow:
                              t.palette.mode === "dark"
                                ? `0 16px 40px ${alpha(t.palette.primary.main, 0.3)}`
                                : `0 16px 32px ${alpha(t.palette.primary.main, 0.2)}`,
                            borderColor: t.palette.primary.main,
                            background:
                              t.palette.mode === "dark"
                                ? `linear-gradient(135deg, ${alpha(
                                    t.palette.primary.main,
                                    0.25,
                                  )} 0%, ${alpha(t.palette.warning.main, 0.15)} 100%)`
                                : `linear-gradient(135deg, ${alpha(
                                    t.palette.primary.main,
                                    0.15,
                                  )} 0%, ${alpha(t.palette.warning.main, 0.1)} 100%)`,
                          },
                        })}
                      >
                        <CardActionArea
                          onClick={() => setIsCreateDialogOpen(true)}
                          sx={{ height: "100%" }}
                        >
                          <CardContent
                            sx={{
                              height: 80,
                              p: 2,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <AddCircleOutlineIcon
                              sx={{
                                fontSize: 40,
                                opacity: 0.9,
                                color: theme.palette.primary.main,
                              }}
                            />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              Add Content
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Box>
                  )}
                </Stack>
              </SortableContext>
              </Box>
            </DndContext>
            )}
          </Box>
        </Grow>
      )}

      {page.pageDataState === "failed" && (
        <Box height={"100vh"}>
          <ErrorHandler message={"Unable to load the page"} />
        </Box>
      )}

      {/* Menu and Dialogs */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            setIsUpdateDialogOpen(true);
            handleMenuClose();
          }}
        >
          <EditIcon fontSize="small" sx={{ mr: 1 }} /> Update
        </MenuItem>
        <MenuItem
          onClick={() => {
            setIsDeleteDialogOpen(true);
            handleMenuClose();
          }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {selectedContent && (
        <RouteContentDialogBox
          isOpen={isUpdateDialogOpen}
          handleClose={() => setIsUpdateDialogOpen(false)}
          mode="update"
          contentId={selectedContent.contentId}
          description={selectedContent.description}
          contentLink={selectedContent.contentLink}
          onUpdate={(payload) =>
            dispatch(updateContent({ contentId: selectedContent.contentId, content: payload, routePath: window.location.pathname }))
          }
        />
      )}

      <RouteContentDialogBox
        isOpen={isCreateDialogOpen}
        handleClose={() => setIsCreateDialogOpen(false)}
        mode="create"
        routeId={currentRouteId}
        onCreate={(payload) =>
          dispatch(createNewContent({ content: payload, routePath: window.location.pathname }))
        }
      />

      {selectedContent && (
        <DeleteContentDialogBox
          open={isDeleteDialogOpen}
          handleClose={() => setIsDeleteDialogOpen(false)}
          type="route_content"
          contentId={selectedContent.contentId}
          routeId={currentRouteId}
        />
      )}
    </Box>
  );
}
