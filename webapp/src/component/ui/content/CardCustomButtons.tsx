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

import { Box, Button, Tooltip, useTheme } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description";
import LinkIcon from "@mui/icons-material/Link";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import React from "react";
import { CustomButton } from "src/types/types";

interface CardCustomButtonsProps {
  buttons: CustomButton[];
  isVisible: boolean;
  hasVisibleCustomButtons: boolean;
  onButtonAction: (button: CustomButton) => void;
  isInOverlay?: boolean;
}

const getButtonIcon = (iconName?: string) => {
  switch (iconName) {
    case "link":
      return <LinkIcon />;
    case "record":
      return <PlayArrowIcon />;
    case "document":
      return <DescriptionIcon />;
    case "presentation":
      return <SlideshowIcon />;
    case "brochure":
      return <MenuBookIcon />;
    case "article":
      return <ArticleIcon />;
    default:
      return null;
  }
};

const CardCustomButtons: React.FC<CardCustomButtonsProps> = ({
  buttons,
  isVisible,
  hasVisibleCustomButtons,
  onButtonAction,
  isInOverlay = false,
}) => {
  const theme = useTheme();

  if (!isVisible || !hasVisibleCustomButtons) {
    return null;
  }

  const visibleButtons = buttons
    .filter((b) => b.isVisible)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  if (visibleButtons.length === 0) {
    return null;
  }

  return (
    <Box
      sx={{
        px: 2.5,
        pt: hasVisibleCustomButtons ? 2.5 : 0,
        pb: hasVisibleCustomButtons ? 1 : 0,
        mt: 0,
        flexShrink: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          width: "100%",
          flexWrap: "nowrap",
          mb: 0,
        }}
      >
        {visibleButtons.map((button, i) => (
          <Tooltip
            key={button.id || `button-${i}`}
            title={button.label || ""}
            arrow
            placement="top"
          >
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={
                button.icon && button.icon !== "none"
                  ? getButtonIcon(button.icon)
                  : undefined
              }
              onClick={() => onButtonAction(button)}
              sx={{
                minHeight: isInOverlay ? 36 : 31,
                fontSize: isInOverlay ? "0.75rem" : "0.8rem",
                textTransform: "none",
                fontWeight: 800,
                px: !button.label && button.icon ? 0.75 : 1.5,
                py: 0.6,
                flex: 1,
                minWidth: 0,
                borderRadius: 8,
                borderColor: isInOverlay ? "rgba(255,255,255,0.3)" : theme.palette.primary.dark,
                color: isInOverlay ? "rgba(255,255,255,0.7)" : theme.palette.primary.dark,
                backgroundColor: isInOverlay ? "rgba(255,255,255,0.08)" : "transparent",
                "&:hover": {
                  color: theme.palette.common.white,
                  borderColor: isInOverlay ? "rgba(255,255,255,0.5)" : theme.palette.common.white,
                  backgroundColor: isInOverlay ? "rgba(255,255,255,0.12)" : "transparent",
                },
                "& .MuiButton-startIcon": {
                  marginRight: !button.label ? 0 : "4px",
                  marginLeft: !button.label ? 0 : "-2px",
                },
                "& .MuiButton-startIcon > svg": {
                  fontSize: 20,
                },
              }}
            >
              <Box
                component="span"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {button.label}
              </Box>
            </Button>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default CardCustomButtons;
