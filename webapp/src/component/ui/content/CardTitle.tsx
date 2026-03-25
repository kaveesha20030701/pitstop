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

import React from "react";
import { CardHeader, Typography, Box, IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import dayjs from "dayjs";
import { Role } from "@utils/types";
import { CustomTheme } from "src/types/types";

interface CardTitleProps {
  description: string;
  createdOn: string;
  customContentTheme?: CustomTheme;
  hasVisibleCustomButtons: boolean;
  isVisible: boolean;
  authorizedRoles: Role[];
  onMoreClick: (e: React.MouseEvent<HTMLElement>) => void;
  onVisibilityToggle: () => void;
  isInOverlay?: boolean;
}

const CardTitle: React.FC<CardTitleProps> = ({
  description,
  createdOn,
  customContentTheme,
  hasVisibleCustomButtons,
  isVisible,
  authorizedRoles,
  onMoreClick,
  onVisibilityToggle,
  isInOverlay = false,
}) => {
  if (isInOverlay) {
    return (
      <Box sx={{ mb: 1.5, px: 2 }}>
        <Typography
          variant="h6"
          sx={{
            ...customContentTheme?.title,
            fontSize: "0.95rem",
            fontWeight: 700,
            lineHeight: 1.4,
            color: "rgba(255,255,255,0.9)",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        >
          {description}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.5)",
            fontWeight: 400,
            display: "block",
            mt: 0.5,
          }}
        >
          {dayjs(createdOn).format("DD MMM YYYY")}
        </Typography>
      </Box>
    );
  }

  return (
    <CardHeader
      action={
        authorizedRoles.includes(Role.SALES_ADMIN) ? (
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Tooltip title={isVisible ? "Hide Content" : "Show Content"} arrow>
              <IconButton
                size="small"
                aria-label={isVisible ? "Hide Content" : "Show Content"}
                onClick={onVisibilityToggle}
                sx={{
                  color: "#fff",
                  backgroundColor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(20px)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
                  mr: 0.5,
                }}
              >
                {isVisible ? (
                  <VisibilityIcon sx={{ width: 20, height: 18 }} />
                ) : (
                  <VisibilityOffIcon sx={{ width: 18, height: 18 }} />
                )}
              </IconButton>
            </Tooltip>
            <IconButton
              onClick={onMoreClick}
              aria-label="more"
              id="long-button"
              aria-haspopup="true"
              size="small"
              sx={{
                color: "rgba(255,255,255,0.7)",
                "&:hover": { color: "#fff" },
              }}
            >
              <MoreVertIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        ) : null
      }
      title={
        <Typography
          variant="h6"
          sx={{
            ...customContentTheme?.title,
            fontSize: "1.1rem",
            fontWeight: 700,
            lineHeight: 1.3,
            color: "#fff",
            display: "-webkit-box",
            wordWrap: "break-word",
            WebkitBoxOrient: "vertical",
            whiteSpace: "normal",
            overflow: "hidden",
            WebkitLineClamp: hasVisibleCustomButtons ? 2 : 3,
          }}
        >
          {description}
        </Typography>
      }
      subheader={
        <Typography
          variant="caption"
          sx={{
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.5)",
            fontWeight: 400,
          }}
        >
          {dayjs(createdOn).format("DD MMM YYYY")}
        </Typography>
      }
      sx={{
        pt: hasVisibleCustomButtons ? 1.2 : 2,
        pb: 0,
        px: 2.5,
        flexShrink: 0,
      }}
    />
  );
};

export default CardTitle;
