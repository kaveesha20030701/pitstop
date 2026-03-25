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
import { Box, Typography } from "@mui/material";
import { CustomTheme } from "src/types/types";
import { safeParseHtml } from "@utils/safeHtml";

interface CardNoteProps {
  note?: string;
  customContentTheme?: CustomTheme;
  onReadMore: () => void;
  isInOverlay?: boolean;
}
const CardNote: React.FC<CardNoteProps> = ({
  note,
  customContentTheme,
  onReadMore,
  isInOverlay = false,
}) => {
  const editedNoteHtml = customContentTheme?.note?.htmlContent?.trim();
  const hasEditedNoteHtml = Boolean(editedNoteHtml);
  const hasNoteContent = hasEditedNoteHtml || Boolean(note?.trim());

  if (!hasNoteContent) {
    return null;
  }

  return (
    <Box sx={isInOverlay ? { mb: 1.5, px: 2 } : {}}>
      <Typography
        component="div"
        variant="body2"
        sx={{
          color: isInOverlay ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.8)",
          fontSize: isInOverlay ? "0.78rem" : "0.7rem",
          lineHeight: isInOverlay ? 1.6 : 1,
          mb: isInOverlay ? 0.5 : 1,
          display: isInOverlay ? "block" : "-webkit-box",
          WebkitBoxOrient: isInOverlay ? "unset" : "vertical",
          overflow: isInOverlay ? "visible" : "hidden",
        }}
      >
        {hasEditedNoteHtml ? (
          <Box
            sx={{
              "& *": {
                margin: 0,
                padding: 0,
              },
              "& p": {
                marginBottom: "0.5em",
              },
              "& a": {
                color: "inherit",
              },
            }}
          >
            {safeParseHtml(editedNoteHtml)}
          </Box>
        ) : note && note.length > 100 ? (
          <>
            {note.slice(0, 100)}…{" "}
            <Typography
              variant="caption"
              component="span"
              sx={{
                color: "#667eea",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "0.8rem",
              }}
              onClick={onReadMore}
            >
              Read more
            </Typography>
          </>
        ) : (
          note
        )}
      </Typography>
    </Box>
  );
};

export default CardNote;
