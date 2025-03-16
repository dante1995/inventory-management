"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  Button,
  IconButton,
  Typography,
  useTheme,
  alpha,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Store as StoreIcon,
  Person as PersonIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import {
  useCreateSalesOrderMutation,
  useGetCustomersQuery,
  useGetStoresQuery,
  Customer,
  Store,
  OrderStatus,
  SalesOrderItem,
  Item,
  useGetItemsQuery,
} from "@/state/api";

/** 
 * Types for line items, if you have a specific interface in your code.
 * Adjust as needed.
 */
interface LineItem {
  id: number;
  itemId: string;
  quantity: number;
  unitPrice: number;
}

interface CreateOrderDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function CreateOrderDialog({ open, onClose }: CreateOrderDialogProps) {
  const theme = useTheme();

  // Example: fetch data for customers & stores &items
  const { data: customers = [], isLoading: isLoadingCustomers } = useGetCustomersQuery();
  const { data: stores = [], isLoading: isLoadingStores } = useGetStoresQuery();
  const { data: items = [], isLoading: isLoadingItems } = useGetItemsQuery();

  // A mutation hook to create new orders (adjust to your API)
  const [createSalesOrder, { isLoading: isCreating }] = useCreateSalesOrderMutation();

  // Form state
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [orderDate, setOrderDate] = useState<Date | null>(new Date());
  const [lineItems, setLineItems] = useState<LineItem[]>([]);

  const handleAddLineItem = () => {
    setLineItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        itemId: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const handleRemoveLineItem = (id: number) => {
    setLineItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleLineItemChange = (id: number, field: keyof LineItem, value: any) => {
    setLineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  /**
   * Submits the new order.
   * Adjust the fields sent to match your back-end.
   */
  const handleCreateOrder = async () => {
    if (!selectedCustomer || !selectedStore || !orderDate) {
      alert("Please select a Customer, Store, and Date.");
      return;
    }

    const payload = {
      companyWorkspaceId: "b70b6b6e-49f8-4c85-a9c4-4fc64e932a23",
      invoiceNumber: "SO-WS1-" + Date.now(),
      customerId: selectedCustomer.id,
      storeId: selectedStore.id,
      orderDate: orderDate.toISOString(),
      items: lineItems.map((item) => ({
        quantity: item.quantity,
        unitPrice: item.unitPrice as unknown as string,
        lineTotal: (item.quantity * item.unitPrice) as unknown as string,
        gstRate: "10.0",
        lineCgst: "10.0",
        lineSgst: "10.0",
        lineIgst: "10.0",
        itemId: item.itemId,
      } as SalesOrderItem)),
      status: 'DRAFT' as OrderStatus,
      totalAmount: lineItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0),
      isInterState: false,
    };

    try {
      await createSalesOrder(payload).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to create order:", error);
      alert("Error creating order. Check console for details.");
    }
  };

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!open) {
      // Clear all fields upon close or mount
      setSelectedCustomer(null);
      setSelectedStore(null);
      setOrderDate(new Date());
      setLineItems([]);
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          p: 0,
          overflowY: "visible",
          borderRadius: 2,
        },
      }}
    >
      {/* --- Title with Close Button --- */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Create New Order
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: theme.palette.text.secondary,
            "&:hover": {
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* --- Main Form Content --- */}
      <DialogContent
        dividers
        sx={{
          pt: 2,
          pb: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Stack spacing={2}>
          {/* Select Customer */}
          <FormControl fullWidth>
            <InputLabel sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <PersonIcon sx={{ fontSize: 18, mb: "2px" }} /> Customer
            </InputLabel>
            <Select
              value={selectedCustomer?.id || ""}
              label="Customer"
              onChange={(e) => {
                const cust = customers.find((c) => c.id === e.target.value);
                setSelectedCustomer(cust || null);
              }}
              disabled={isLoadingCustomers}
            >
              {customers.map((customer) => (
                <MenuItem key={customer.id} value={customer.id}>
                  {customer.firstName} {customer.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Select Store */}
          <FormControl fullWidth>
            <InputLabel sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StoreIcon sx={{ fontSize: 18, mb: "2px" }} /> Store
            </InputLabel>
            <Select
              value={selectedStore?.id || ""}
              label="Store"
              onChange={(e) => {
                const store = stores.find((s) => s.id === e.target.value);
                setSelectedStore(store || null);
              }}
              disabled={isLoadingStores}
            >
              {stores.map((store) => (
                <MenuItem key={store.id} value={store.id}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Order Date */}
          <Stack direction="row" spacing={2} alignItems="center">
            <CalendarIcon color="action" />
            <TextField
              label="Order Date"
              type="date"
              value={orderDate ? format(orderDate, 'yyyy-MM-dd') : ''}
              onChange={(e) => setOrderDate(e.target.value ? new Date(e.target.value) : null)}
              InputLabelProps={{
                shrink: true,
              }}
              size="small"
              fullWidth
            />
          </Stack>

          {/* Line Items Section */}
          <Typography variant="subtitle1" fontWeight={600}>
            Line Items
          </Typography>
          <Stack spacing={1}>
            {lineItems.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ pb: 1, borderBottom: `1px solid ${theme.palette.divider}` }}
              >
                <InputLabel sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                </InputLabel>
                <Select
                  value={item.itemId}
                  label="Item"
                  onChange={(e) => {
                    const itemObj = items.find((s) => s.id === e.target.value);
                    if (itemObj) {
                      handleLineItemChange(item.id, "itemId", e.target.value);
                    }
                  }}
                  disabled={isLoadingItems}
                  size="small"
                  sx={{ width: 160 }}
                >
                  {items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
                <TextField
                  label="Qty"
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleLineItemChange(item.id, "quantity", Number(e.target.value))
                  }
                  size="small"
                  sx={{ width: 80 }}
                />
                <TextField
                  label="Unit Price"
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) =>
                    handleLineItemChange(item.id, "unitPrice", Number(e.target.value))
                  }
                  size="small"
                  sx={{ width: 100 }}
                />

                <Tooltip title="Remove Item">
                  <IconButton
                    onClick={() => handleRemoveLineItem(item.id)}
                    sx={{
                      color: theme.palette.error.main,
                      "&:hover": {
                        backgroundColor: alpha(theme.palette.error.main, 0.1),
                      },
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>
            ))}
            <Button
              variant="text"
              startIcon={<AddIcon />}
              onClick={handleAddLineItem}
              sx={{
                alignSelf: "start",
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              Add Line Item
            </Button>
          </Stack>
        </Stack>
      </DialogContent>

      {/* --- Actions --- */}
      <DialogActions
        sx={{
          py: 1.5,
          px: 2.5,
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCreateOrder}
          disabled={isCreating}
          sx={{
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          {isCreating ? <CircularProgress size={20} /> : "Create Order"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
