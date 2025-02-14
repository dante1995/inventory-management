// SalesOrderPage.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Box, Stack, useTheme, useMediaQuery, IconButton, Typography, Chip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { format } from "date-fns";
import { alpha } from "@mui/material";
import { SelectChangeEvent } from "@mui/material";

import SalesOrderHeader from './SalesOrderHeader';
import OrdersDataGrid from './OrdersDataGrid';
import OrderActionMenu from './OrderActionMenu';
import FilterPopover from './FilterPopover';
import OrderDetailDrawer from './OrderDetailDrawer';
import CreateOrderDialog from './CreateOrderDialog';

import {
  Receipt as ReceiptIcon,
  CalendarToday as CalendarIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Store as StoreIcon,
} from "@mui/icons-material";

import {
  useGetSalesOrdersQuery,
  useUpdateSalesOrderStatusMutation,
  useDeleteSalesOrderMutation,
  useGetCustomersQuery,
  useGetStoresQuery,
  OrderStatus,
} from "@/state/api";
import { ExtendedSalesOrder } from './types';
import { statusConfig } from './statusConfig';

function isToday(date: string | Date) {
  const now = new Date();
  const d = new Date(date);
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
}

export default function SalesOrderPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Local State
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ExtendedSalesOrder | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPopoverAnchor, setFilterPopoverAnchor] = useState<null | HTMLElement>(null);
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "ALL">("ALL");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);

  // API Calls
  const { data: orders = [], isLoading, refetch } = useGetSalesOrdersQuery();
  const { data: customers = [] } = useGetCustomersQuery();
  const { data: stores = [] } = useGetStoresQuery();
  const [updateStatus] = useUpdateSalesOrderStatusMutation();
  const [deleteOrder] = useDeleteSalesOrderMutation();

  // Combine order data with details
  const ordersWithDetails: ExtendedSalesOrder[] = useMemo(() => {
    return orders.map((order) => ({
      ...order,
      customer: customers.find((c) => c.id === order.customerId),
      store: stores.find((s) => s.id === order.storeId),
    }));
  }, [orders, customers, stores]);

  // Filter logic
  const filteredOrders = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    return ordersWithDetails.filter((order) => {
      const matchesSearch =
        order.invoiceNumber?.toLowerCase().includes(searchLower) ||
        (order.store && order.store.name.toLowerCase().includes(searchLower)) ||
        (order.customer &&
          `${order.customer.firstName} ${order.customer.lastName}`
            .toLowerCase()
            .includes(searchLower)) ||
        (order.customer && order.customer.phone.toLowerCase().includes(searchLower));
      const matchesStatus = filterStatus === "ALL" ? true : order.status === filterStatus;
      let matchesDateRange = true;
      if (startDate) {
        const filterStart = new Date(startDate);
        const orderDate = new Date(order.orderDate);
        if (orderDate < filterStart) matchesDateRange = false;
      }
      if (endDate) {
        const filterEnd = new Date(endDate);
        const orderDate = new Date(order.orderDate);
        if (orderDate > filterEnd) matchesDateRange = false;
      }
      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [ordersWithDetails, searchQuery, filterStatus, startDate, endDate]);

  // Handlers
  const handleOpenDetailPanel = (order: ExtendedSalesOrder) => {
    setSelectedOrder(order);
    setDetailPanelOpen(true);
  };

  const handleCloseDetailPanel = () => {
    setSelectedOrder(null);
    setDetailPanelOpen(false);
  };

  const handleStatusUpdate = async (id: string, status: "COMPLETED" | "CANCELLED") => {
    try {
      await updateStatus({ id, status }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(id).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    }
  };

  const handleFilterOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterPopoverAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterPopoverAnchor(null);
  };

  const handleActionMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    order: ExtendedSalesOrder
  ) => {
    setSelectedOrder(order);
    setActionMenuAnchor(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setActionMenuAnchor(null);
  };

  const handleFilterStatusChange = (event: SelectChangeEvent<string>) => {
    setFilterStatus(event.target.value as OrderStatus | "ALL");
  };

  // Today's Summary Stats
  const todayOrders = ordersWithDetails.filter((o) => isToday(o.orderDate));
  const todayCount = todayOrders.length;
  const todayPending = todayOrders.filter((o) => o.status === "PENDING").length;
  const todayCompleted = todayOrders.filter((o) => o.status === "COMPLETED").length;
  const todayCancelled = todayOrders.filter((o) => o.status === "CANCELLED").length;

  // DataGrid Columns
  const columns: GridColDef<ExtendedSalesOrder>[] = [
    {
      field: "invoiceNumber",
      headerName: "Invoice #",
      flex: 1,
      minWidth: 130,
      renderCell: (params: GridRenderCellParams<ExtendedSalesOrder>) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <ReceiptIcon fontSize="small" color="primary" />
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => handleOpenDetailPanel(params.row)}
          >
            {params.value}
          </Typography>
        </Stack>
      ),
    },
    {
      field: "orderDate",
      headerName: "Date",
      flex: 1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<ExtendedSalesOrder>) => {
        const date = params.value ? format(new Date(params.value), "dd MMM yyyy") : "N/A";
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarIcon fontSize="small" color="action" />
            <Typography variant="body2">{date}</Typography>
          </Stack>
        );
      },
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1.4,
      minWidth: 180,
      renderCell: (params: GridRenderCellParams<ExtendedSalesOrder>) => {
        const customer = params.row.customer;
        if (!customer) return <Typography variant="body2">N/A</Typography>;
        return (
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <PersonIcon fontSize="small" color="action" />
              <Typography variant="body2" fontWeight={500}>
                {customer.firstName} {customer.lastName}
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              {customer.phone}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "store",
      headerName: "Store",
      flex: 1.2,
      minWidth: 160,
      renderCell: (params: GridRenderCellParams<ExtendedSalesOrder>) => {
        const store = params.row.store;
        if (!store) return <Typography variant="body2">N/A</Typography>;
        return (
          <Stack spacing={0.5}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <StoreIcon fontSize="small" color="action" />
              <Typography variant="body2" fontWeight={500}>
                {store.name}
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary" noWrap>
              {store.address}
            </Typography>
          </Stack>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.9,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<ExtendedSalesOrder>) => {
        const status = params.value as OrderStatus;
        const StatusIcon = statusConfig[status].icon;
        const config = statusConfig[status];
        return (
          <Chip
            icon={<StatusIcon fontSize="small" />}
            label={config.label}
            color={config.color as any}
            size="small"
            sx={{
              minWidth: 90,
              fontWeight: 500,
              "& .MuiChip-icon": { marginLeft: 1 },
            }}
          />
        );
      },
    },
    {
      field: "totalAmount",
      headerName: "Amount",
      flex: 1,
      minWidth: 130,
      renderCell: (params: GridRenderCellParams<ExtendedSalesOrder>) => (
        <Typography variant="body2" fontWeight={600} color="primary.main">
          ₹
          {Number(params.value).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams<ExtendedSalesOrder>) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            size="small"
            onClick={() => handleOpenDetailPanel(params.row)}
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={(event) => handleActionMenuOpen(event, params.row)}
            sx={{
              color: theme.palette.text.secondary,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                color: theme.palette.primary.main,
              },
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        p: { xs: 2, md: 3 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Stack spacing={3}>
        <SalesOrderHeader
          theme={theme}
          isSmallScreen={isSmallScreen}
          todayCount={todayCount}
          todayPending={todayPending}
          todayCompleted={todayCompleted}
          todayCancelled={todayCancelled}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onFilterOpen={handleFilterOpen}
          onRefresh={refetch}
          onNewOrder={() => setCreateDialogOpen(true)}
          onExport={() => alert("Export Orders feature to be implemented.")}
        />
        <OrdersDataGrid
          filteredOrders={filteredOrders}
          columns={columns}
          isLoading={isLoading}
          theme={theme}
        />
      </Stack>

      <OrderActionMenu
        anchorEl={actionMenuAnchor}
        onClose={handleActionMenuClose}
        selectedOrder={selectedOrder}
        onUpdateStatus={handleStatusUpdate}
        onDelete={handleDelete}
        theme={theme}
      />

      <FilterPopover
        anchorEl={filterPopoverAnchor}
        onClose={handleFilterClose}
        filterStatus={filterStatus}
        onFilterStatusChange={handleFilterStatusChange}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        isSmallScreen={isSmallScreen}
      />

      {createDialogOpen && (
        <CreateOrderDialog
          open={createDialogOpen}
          onClose={() => {
            setCreateDialogOpen(false);
            refetch();
          }}
        />
      )}

      <OrderDetailDrawer
        open={detailPanelOpen}
        onClose={handleCloseDetailPanel}
        order={selectedOrder}
        theme={theme}
        isSmallScreen={isSmallScreen}
      />
    </Box>
  );
}
