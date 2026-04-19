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

import {
  Box,
  Paper,
  Typography,
  IconButton,
  Fade,
  Skeleton,
  useTheme,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { SearchSummaryBoxProps } from "@/types/types";

const HtmlContent = styled(Box)(({ theme }) => ({
  "& ul": {
    margin: 0,
    paddingLeft: "1.5rem",
    listStyle: "disc",
  },
  "& li": {
    marginBottom: "0.75rem",
    lineHeight: 1.6,
    color: theme.palette.text.primary,
    fontSize: "0.875rem",
  },
  "& strong": {
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
}));

export default function SearchSummaryBox({
  summary,
  isLoading,
  error,
  onDismiss,
}: SearchSummaryBoxProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Fade in={true} timeout={300}>
      <Paper
        elevation={0}
        sx={{
          mb: 4,
          p: 2,
          pl: 2.5,
          width: "100%",
          borderLeft: `3px solid ${theme.palette.primary.main}`,
          border: `0.5px solid ${isDark ? "rgba(175,169,236,0.2)" : "rgba(120,100,220,0.25)"}`,
          
          background: isDark
            ? "rgba(38, 33, 92, 0.35)"
            : "rgba(238, 237, 254, 0.45)",
          backdropFilter: "blur(16px) saturate(1.4)",
          WebkitBackdropFilter: "blur(16px) saturate(1.4)",
          boxShadow: isDark
            ? "0 1px 3px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.25), inset 0 0.5px 0 rgba(255,255,255,0.06)"
            : "0 1px 3px rgba(80,60,200,0.06), 0 4px 16px rgba(80,60,200,0.08), inset 0 0.5px 0 rgba(255,255,255,0.55)",
          borderRadius: 2,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.25,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <AutoAwesomeIcon
              sx={{
                color: theme.palette.primary.main,
                fontSize: 16,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: theme.palette.primary.main,
              }}
            >
              AI Summary
            </Typography>
          </Box>
          <IconButton
            size="small"
            onClick={onDismiss}
            sx={{
              width: 24,
              height: 24,
              color: "text.secondary",
              "&:hover": {
                background: "rgba(120,100,220,0.12)",
                color: "text.primary",
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Box>

        {/* Loading */}
        {isLoading && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Skeleton variant="text" height={14} width="100%" />
            <Skeleton variant="text" height={14} width="90%" />
            <Skeleton variant="text" height={14} width="75%" />
          </Box>
        )}

        {/* Error */}
        {error && !isLoading && (
          <Box
            sx={{
              fontSize: "0.8125rem",
              color: "text.secondary",
              lineHeight: 1.6,
              px: 1.25,
              py: 0.75,
              borderRadius: 1,
              border: `0.5px solid rgba(120,100,220,0.2)`,
              background: "rgba(238,237,254,0.3)",
            }}
          >
            <Typography variant="body2" sx={{ fontSize: "0.8125rem" }}>
              {error}
            </Typography>
            <Typography
              variant="caption"
              sx={{ display: "block", mt: 0.75, color: "text.secondary", opacity: 0.8 }}
            >
              Results are still available below — you can browse them without the summary.
            </Typography>
          </Box>
        )}

        {/* Summary */}
        {summary && !isLoading && !error && (
          <HtmlContent
            dangerouslySetInnerHTML={{ __html: summary }}
          />
        )}
      </Paper>
    </Fade>
  );
}
