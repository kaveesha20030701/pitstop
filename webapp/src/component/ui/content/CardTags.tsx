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
import { Box, Chip } from "@mui/material";

interface CardTagsProps {
  tags: string[];
  isInOverlay?: boolean;
}

const CardTags: React.FC<CardTagsProps> = ({ tags, isInOverlay = false }) => {
  const hasValidTags = tags?.filter((t) => t.trim()).length > 0;

  if (!hasValidTags) {
    return null;
  }

  return (
    <Box sx={isInOverlay ? { display: "flex", flexWrap: "wrap", gap: 0.75, mt: 0.5, px: 2, mb: 1.5 } : { display: "flex", flexWrap: "wrap", gap: 0.75 }}>
      {tags
        .filter((t) => t.trim())
        .map((tag, i) => (
          <Chip
            key={i}
            label={tag.length > 12 ? `${tag.slice(0, 12)}…` : tag}
            size="small"
            sx={{
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.75rem",
              height: 22,
              borderRadius: 1.5,
              "& .MuiChip-label": { px: 1, py: 0 },
            }}
          />
        ))}
    </Box>
  );
};

export default CardTags;
