// OrderDetailDrawer.tsx
import React from "react";
import {
  Drawer,
  Stack,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { format } from "date-fns";
import { ExtendedSalesOrder } from "./types";
import { Chip } from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import { statusConfig } from "./statusConfig";

interface OrderDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  order: ExtendedSalesOrder | null;
  theme: any;
  isSmallScreen: boolean;
}

export default function OrderDetailDrawer({
  open,
  onClose,
  order,
  theme,
  isSmallScreen,
}: OrderDetailDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: isSmallScreen ? "100%" : 480, p: 3 },
      }}
    >
      {order ? (
        <Stack spacing={2} height="100%">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" fontWeight={600}>
              Order Details
            </Typography>
            <IconButton onClick={onClose}>
              <CancelIcon />
            </IconButton>
          </Stack>
          <Stack spacing={1} mt={2}>
            <Typography variant="body2" color="text.secondary">
              Invoice No: <strong>{order.invoiceNumber}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Order Date:{" "}
              {order.orderDate
                ? format(new Date(order.orderDate), "dd MMM yyyy")
                : "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Customer:{" "}
              {order.customer
                ? `${order.customer.firstName} ${order.customer.lastName}`
                : "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Store: {order.store ? order.store.name : "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Status: {statusConfig[order.status].label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Amount: ₹
              {Number(order.totalAmount).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>
          </Stack>
          <Box flexGrow={1} />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="contained"
              onClick={() =>
                alert("Save changes (if editing is implemented).")
              }
            >
              Save
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          flexDirection="column"
        >
          <CircularProgress />
          <Typography variant="body2" mt={2}>
            Loading details...
          </Typography>
        </Box>
      )}
    </Drawer>
  );
}
