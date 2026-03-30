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

import { Avatar, Box, Fade, IconButton, Modal, Typography, useTheme } from "@mui/material";
import { LikerResponse } from "src/types/types";

import React from "react";

interface LikersModalProps {
  open: boolean;
  onClose: () => void;
  likers: LikerResponse[];
}

const LikersModal: React.FC<LikersModalProps> = ({ open, onClose, likers }) => {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="likers-modal-title"
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 460,
            maxHeight: "70vh",
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.common.white
                : "rgb(42, 45, 58)",
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              px: 2,
              py: 1.25,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              id="likers-modal-title"
              variant="h6"
              sx={{
                fontWeight: 600,
                color:
                  theme.palette.mode === "light"
                    ? theme.palette.common.black
                    : theme.palette.common.white,
              }}
            >
              Likes ({likers.length})
            </Typography>
            <IconButton
              onClick={onClose}
              aria-label="Close likes modal"
              size="small"
              sx={{
                color:
                  theme.palette.mode === "light"
                    ? theme.palette.common.black
                    : theme.palette.common.white,
              }}
            >
              ✕
            </IconButton>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              px: 2,
              py: 1.5,
              "&::-webkit-scrollbar": { width: 6 },
            }}
          >
            {likers.length > 0 ? (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
                {likers.map((liker, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1.5,
                      borderRadius: 2,
                      backgroundColor:
                        theme.palette.mode === "light"
                          ? theme.palette.common.white
                          : "rgba(43, 45, 54, 0.94)",
                      border:
                        theme.palette.mode === "light"
                          ? "1px solid rgba(0,0,0,0.12)"
                          : "1px solid rgba(255,255,255,0.2)",
                      "&:hover": {
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? "rgba(0,0,0,0.05)"
                            : "rgba(255,255,255,0.1)",
                        border:
                          theme.palette.mode === "light"
                            ? "1px solid rgba(0,0,0,0.12)"
                            : "1px solid rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    <Avatar
                      src={liker.thumbnail}
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: theme.palette.common.black,
                        flexShrink: 0,
                        fontSize: 14,
                        fontWeight: 700,
                        color:
                          theme.palette.mode === "light"
                            ? "rgba(0,0,0,0.6)"
                            : "rgba(255,255,255,0.5)",
                      }}
                    >
                      {(
                        liker.firstName?.[0] ||
                        liker.lastName?.[0] ||
                        liker.email?.[0] ||
                        "?"
                      ).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: 14,
                          fontWeight: 600,
                          color:
                            theme.palette.mode === "light"
                              ? theme.palette.common.black
                              : theme.palette.common.white,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {liker.firstName && liker.lastName
                          ? `${liker.firstName} ${liker.lastName}`
                          : liker.firstName || liker.lastName || ""}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 12,
                          color:
                            theme.palette.mode === "light"
                              ? theme.palette.common.black
                              : theme.palette.common.white,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {liker.email}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 60,
                  color:
                    theme.palette.mode === "light"
                      ? theme.palette.common.black
                      : theme.palette.common.white,
                }}
              >
                <Typography variant="body2">No one has liked this yet</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default LikersModal;
