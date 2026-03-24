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

import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import { Box, Card, Chip, IconButton, Typography, useTheme } from "@mui/material";
import Button from "@mui/material/Button";

interface ReparentConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  pagesToReparent?: string[];
  newParentName?: string;
}

const ReparentConfirmationDialog = ({
  open,
  onConfirm,
  onCancel,
  pagesToReparent = [],
  newParentName = "Parent Page",
}: ReparentConfirmationDialogProps) => {
  const theme = useTheme();

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <Box
        onClick={onCancel}
        sx={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 10004,
        }}
      />

      {/* Dialog */}
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10005,
          width: "90%",
          maxWidth: 500,
        }}
      >
        <Card
          sx={{
            backgroundColor: theme.palette.background.paper,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
              color: "white",
              py: 2.5,
              px: 3,
              pb: 3,
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <InfoIcon sx={{ fontSize: 26, flexShrink: 0 }} />
              <Typography variant="h5" fontWeight="bold">
                Are you sure you want to reparent these pages?
              </Typography>
            </Box>
            <IconButton
              aria-label="close"
              onClick={onCancel}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Content */}
          <Box sx={{ pt: 2, pb: 2, px: 3 }}>
            <Box
              sx={{
                p: 2,
                backgroundColor:
                  theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[50],
              }}
            >
              {/* Pages to reparent */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1.5,
                }}
              >
                {pagesToReparent.length > 0 ? (
                  pagesToReparent.map((page, idx) => (
                    <Chip
                      key={idx}
                      label={page}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        fontSize: "0.8rem",
                      }}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No pages selected
                  </Typography>
                )}
              </Box>

              {/* Arrow indicator */}
              <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
                <ArrowDownwardIcon sx={{ color: theme.palette.primary.main, fontSize: 20 }} />
              </Box>

              {/* New parent */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 1.5 }}>
                <Chip
                  label={newParentName}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    fontWeight: 500,
                    fontSize: "0.8rem",
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Actions */}
          <Box sx={{ px: 3, py: 2, gap: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={onCancel}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                color: theme.palette.grey[700],
                borderColor: theme.palette.grey[300],
                "&:hover": {
                  borderColor: theme.palette.grey[400],
                  backgroundColor: theme.palette.grey[50],
                },
              }}
            >
              No
            </Button>

            <Button
              variant="contained"
              onClick={onConfirm}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
                color: theme.palette.common.white,
              }}
            >
              Yes
            </Button>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default ReparentConfirmationDialog;
