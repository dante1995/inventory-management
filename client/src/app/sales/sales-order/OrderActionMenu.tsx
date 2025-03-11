// OrderActionMenu.tsx
import React from "react";
import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { ExtendedSalesOrder } from "./types";

interface OrderActionMenuProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  selectedOrder: ExtendedSalesOrder | null;
  onUpdateStatus: (id: string, status: "COMPLETED" | "CANCELLED") => void;
  onDelete: (id: string) => void;
  theme: any;
}

export default function OrderActionMenu({
  anchorEl,
  onClose,
  selectedOrder,
  onUpdateStatus,
  onDelete,
  theme,
}: OrderActionMenuProps) {
  const handleMenuAction = (
    action: "COMPLETED" | "CANCELLED" | "DELETE"
  ) => {
    if (selectedOrder) {
      if (action === "DELETE") {
        onDelete(selectedOrder.id);
      } else {
        onUpdateStatus(selectedOrder.id, action);
      }
    }
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      PaperProps={{ elevation: 3, sx: { minWidth: 180 } }}
    >
      <MenuItem
        onClick={() => handleMenuAction("COMPLETED")}
        sx={{
          color: theme.palette.success.main,
          "&:hover": { backgroundColor: alpha(theme.palette.success.main, 0.1) },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <CheckCircleIcon fontSize="small" />
          <Typography>Mark Completed</Typography>
        </Stack>
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuAction("CANCELLED")}
        sx={{
          color: theme.palette.error.main,
          "&:hover": { backgroundColor: alpha(theme.palette.error.main, 0.1) },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <CancelIcon fontSize="small" />
          <Typography>Mark Cancelled</Typography>
        </Stack>
      </MenuItem>
      <MenuItem
        onClick={() => handleMenuAction("DELETE")}
        sx={{
          color: theme.palette.error.main,
          "&:hover": { backgroundColor: alpha(theme.palette.error.main, 0.1) },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <DeleteIcon fontSize="small" />
          <Typography>Delete Order</Typography>
        </Stack>
      </MenuItem>
    </Menu>
  );
}
