"use client";

import { useState, useMemo } from 'react';
import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Drawer,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Stack,
  TextField,
  Typography,
  alpha,
  useMediaQuery,
  useTheme,
  Tooltip,
  Select,
  MenuItem as MuiMenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import {
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Cancel as CancelIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  FileDownload as FileDownloadIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Receipt as ReceiptIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Store as StoreIcon,
  FilterList as FilterListIcon,
  CancelPresentation as CancelPresentationIcon,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import {
  useGetSalesOrdersQuery,
  useUpdateSalesOrderStatusMutation,
  useDeleteSalesOrderMutation,
  useGetCustomersQuery,
  useGetStoresQuery,
  SalesOrder,
  OrderStatus,
  Customer,
  Store,
} from '@/state/api';
import CreateOrderDialog from './CreateOrderDialog';

//
// --- Configuration for status display ---
//
const statusConfig = {
  DRAFT: { color: 'default', label: 'Draft', icon: ReceiptIcon },
  PENDING: { color: 'warning', label: 'Pending', icon: CalendarIcon },
  COMPLETED: { color: 'success', label: 'Completed', icon: CheckCircleIcon },
  CANCELLED: { color: 'error', label: 'Cancelled', icon: CancelIcon },
} as const;

//
// --- Utility function to check if date is 'today' ---
//
const isToday = (date: string | Date) => {
  const now = new Date();
  const d = new Date(date);
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};

interface ExtendedSalesOrder extends SalesOrder {
  customer?: Customer;
  store?: Store;
}

export default function SalesOrderPage() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  //
  // --- Local State ---
  //
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [detailPanelOpen, setDetailPanelOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ExtendedSalesOrder | null>(null);

  // Single text-based search query
  const [searchQuery, setSearchQuery] = useState('');

  // Compact filter popover
  const [filterPopoverAnchor, setFilterPopoverAnchor] = useState<null | HTMLElement>(null);

  // Example filter states: status & date range
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'ALL'>('ALL');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // "More" action menu
  const [actionMenuAnchor, setActionMenuAnchor] = useState<null | HTMLElement>(null);

  //
  // --- API Calls ---
  //
  const { data: orders = [], isLoading, refetch } = useGetSalesOrdersQuery();
  const { data: customers = [] } = useGetCustomersQuery();
  const { data: stores = [] } = useGetStoresQuery();

  const [updateStatus] = useUpdateSalesOrderStatusMutation();
  const [deleteOrder] = useDeleteSalesOrderMutation();

  //
  // --- Combine order data with associated customer and store info ---
  //
  const ordersWithDetails: ExtendedSalesOrder[] = useMemo(() => {
    return orders.map((order) => ({
      ...order,
      customer: customers.find((c) => c.id === order.customerId),
      store: stores.find((s) => s.id === order.storeId),
    }));
  }, [orders, customers, stores]);

  //
  // --- Filter Logic ---
  //
  const filteredOrders = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();

    return ordersWithDetails.filter((order) => {
      // Single text search across multiple fields
      const matchesSearch =
        order.invoiceNumber?.toLowerCase().includes(searchLower) ||
        (order.store && order.store.name.toLowerCase().includes(searchLower)) ||
        (order.customer &&
          `${order.customer.firstName} ${order.customer.lastName}`
            .toLowerCase()
            .includes(searchLower)) ||
        (order.customer && order.customer.phone.toLowerCase().includes(searchLower));

      // Status filter
      const matchesStatus =
        filterStatus === 'ALL' ? true : order.status === filterStatus;

      // Date range filter
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

  //
  // --- Handlers ---
  //
  const handleOpenDetailPanel = (order: ExtendedSalesOrder) => {
    setSelectedOrder(order);
    setDetailPanelOpen(true);
  };

  const handleCloseDetailPanel = () => {
    setSelectedOrder(null);
    setDetailPanelOpen(false);
  };

  const handleStatusUpdate = async (id: string, status: 'COMPLETED' | 'CANCELLED') => {
    try {
      await updateStatus({ id, status }).unwrap();
      refetch();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(id).unwrap();
        refetch();
      } catch (error) {
        console.error('Failed to delete order:', error);
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

  const handleChangeFilterStatus = (event: SelectChangeEvent) => {
    setFilterStatus(event.target.value as OrderStatus | 'ALL');
  };

  //
  // --- Today’s Summary Stats ---
  //
  const todayOrders = ordersWithDetails.filter((o) => isToday(o.orderDate));
  const todayCount = todayOrders.length;
  const todayPending = todayOrders.filter((o) => o.status === 'PENDING').length;
  const todayCompleted = todayOrders.filter((o) => o.status === 'COMPLETED').length;
  const todayCancelled = todayOrders.filter((o) => o.status === 'CANCELLED').length;

  //
  // --- DataGrid Columns ---
  //
  const columns: GridColDef<ExtendedSalesOrder>[] = [
    {
      field: 'invoiceNumber',
      headerName: 'Invoice #',
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
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' },
            }}
            onClick={() => handleOpenDetailPanel(params.row)}
          >
            {params.value}
          </Typography>
        </Stack>
      ),
    },
    {
      field: 'orderDate',
      headerName: 'Date',
      flex: 1,
      minWidth: 120,
      renderCell: (params: GridRenderCellParams<ExtendedSalesOrder>) => {
        const date = params.value ? format(new Date(params.value), 'dd MMM yyyy') : 'N/A';
        return (
          <Stack direction="row" spacing={1} alignItems="center">
            <CalendarIcon fontSize="small" color="action" />
            <Typography variant="body2">{date}</Typography>
          </Stack>
        );
      },
    },
    {
      field: 'customer',
      headerName: 'Customer',
      flex: 1.4,
      minWidth: 180,
      renderCell: (params: GridRenderCellParams<ExtendedSalesOrder>) => {
        const customer = params.row.customer;
        if (!customer) {
          return <Typography variant="body2">N/A</Typography>;
        }
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
      field: 'store',
      headerName: 'Store',
      flex: 1.2,
      minWidth: 160,
      renderCell: (params: GridRenderCellParams<ExtendedSalesOrder>) => {
        const store = params.row.store;
        if (!store) {
          return <Typography variant="body2">N/A</Typography>;
        }
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
      field: 'status',
      headerName: 'Status',
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
              '& .MuiChip-icon': {
                marginLeft: 1,
              },
            }}
          />
        );
      },
    },
    {
      field: 'totalAmount',
      headerName: 'Amount',
      flex: 1,
      minWidth: 130,
      renderCell: (params: GridRenderCellParams<ExtendedSalesOrder>) => (
        <Typography variant="body2" fontWeight={600} color="primary.main">
          ₹
          {Number(params.value).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params: GridRenderCellParams<ExtendedSalesOrder>) => (
        <Stack direction="row" spacing={1}>
          <Tooltip title="View / Edit">
            <IconButton
              size="small"
              onClick={() => handleOpenDetailPanel(params.row)}
              sx={{
                color: theme.palette.text.secondary,
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton
            size="small"
            onClick={(event) => handleActionMenuOpen(event, params.row)}
            sx={{
              color: theme.palette.text.secondary,
              '&:hover': {
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
        height: '100%',
        p: { xs: 2, md: 3 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Stack spacing={3}>
        {/* ---- Header and Today’s Overview ---- */}
        <Card sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            {/* Title + Primary Actions */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={2}
            >
              {/* Left: Title */}
              <Stack direction="row" spacing={2} alignItems="center">
                <ReceiptIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.text.primary,
                  }}
                >
                  Manage Sales Orders
                </Typography>
              </Stack>

              {/* Right: Actions */}
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                width={{ xs: '100%', sm: 'auto' }}
              >
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={() => refetch()}
                  sx={{
                    borderColor: alpha(theme.palette.primary.main, 0.2),
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  Refresh Orders
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setCreateDialogOpen(true)}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  New Order
                </Button>
              </Stack>
            </Stack>

            {/* Today’s Overview */}
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Card
                sx={{
                  flex: 1,
                  minWidth: isSmallScreen ? '100%' : 200,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="body2" color="text.secondary">
                    Today’s Orders
                  </Typography>
                  <Typography variant="h6">{todayCount}</Typography>
                </Stack>
                <ReceiptIcon color="primary" />
              </Card>
              <Card
                sx={{
                  flex: 1,
                  minWidth: isSmallScreen ? '100%' : 200,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="body2" color="text.secondary">
                    Today’s Pending
                  </Typography>
                  <Typography variant="h6">{todayPending}</Typography>
                </Stack>
                <CalendarIcon color="warning" />
              </Card>
              <Card
                sx={{
                  flex: 1,
                  minWidth: isSmallScreen ? '100%' : 200,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="body2" color="text.secondary">
                    Today’s Completed
                  </Typography>
                  <Typography variant="h6">{todayCompleted}</Typography>
                </Stack>
                <CheckCircleIcon color="success" />
              </Card>
              <Card
                sx={{
                  flex: 1,
                  minWidth: isSmallScreen ? '100%' : 200,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack spacing={0.5}>
                  <Typography variant="body2" color="text.secondary">
                    Today’s Cancelled
                  </Typography>
                  <Typography variant="h6">{todayCancelled}</Typography>
                </Stack>
                <CancelPresentationIcon color="error" />
              </Card>
            </Stack>

            {/* Single Search + Filters */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={2}
              alignItems="stretch"
            >
              {/* Single search bar across all parameters */}
              <TextField
                fullWidth
                placeholder="Search by Invoice #, Store, or Customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  flex: 2,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: theme.palette.background.paper,
                  },
                }}
              />

              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={handleFilterOpen}
                sx={{
                  minWidth: 120,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                Filters
              </Button>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={() => alert('Export Orders feature to be implemented.')}
                sx={{
                  minWidth: 120,
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  '&:hover': {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                Export Orders
              </Button>
            </Stack>
          </Stack>
        </Card>

        {/* ---- Data Grid for Orders ---- */}
        <Card>
          <DataGrid<ExtendedSalesOrder>
            rows={filteredOrders}
            columns={columns}
            loading={isLoading}
            autoHeight
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: { paginationModel: { pageSize: 25 } },
              sorting: {
                sortModel: [{ field: 'orderDate', sort: 'desc' }],
              },
            }}
            disableRowSelectionOnClick
            sx={{
              border: 'none',
              '& .MuiDataGrid-cell': {
                borderColor: theme.palette.divider,
                py: 1.5,
              },
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: alpha(theme.palette.primary.main, 0.05),
                borderBottom: `1px solid ${theme.palette.divider}`,
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.02),
              },
            }}
          />
        </Card>
      </Stack>

      {/* ---- Action Menu ---- */}
      <Menu
        anchorEl={actionMenuAnchor}
        open={Boolean(actionMenuAnchor)}
        onClose={handleActionMenuClose}
        PaperProps={{
          elevation: 3,
          sx: { minWidth: 180 },
        }}
      >
        <MenuItem
          onClick={() => {
            if (selectedOrder) {
              handleStatusUpdate(selectedOrder.id, 'COMPLETED');
            }
            handleActionMenuClose();
          }}
          sx={{
            color: theme.palette.success.main,
            '&:hover': { backgroundColor: alpha(theme.palette.success.main, 0.1) },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <CheckCircleIcon fontSize="small" />
            <Typography>Mark Completed</Typography>
          </Stack>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedOrder) {
              handleStatusUpdate(selectedOrder.id, 'CANCELLED');
            }
            handleActionMenuClose();
          }}
          sx={{
            color: theme.palette.error.main,
            '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.1) },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <CancelIcon fontSize="small" />
            <Typography>Mark Cancelled</Typography>
          </Stack>
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedOrder) {
              handleDelete(selectedOrder.id);
            }
            handleActionMenuClose();
          }}
          sx={{
            color: theme.palette.error.main,
            '&:hover': { backgroundColor: alpha(theme.palette.error.main, 0.1) },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <DeleteIcon fontSize="small" />
            <Typography>Delete Order</Typography>
          </Stack>
        </MenuItem>
      </Menu>

      {/* ---- Filter Popover (compact overlay) ---- */}
      <Popover
        open={Boolean(filterPopoverAnchor)}
        anchorEl={filterPopoverAnchor}
        onClose={handleFilterClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: { p: 2, width: isSmallScreen ? '90%' : 320 },
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Refine Your Orders
        </Typography>

        {/* Status filter */}
        <FormControl fullWidth size="small" sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select value={filterStatus} label="Status" onChange={handleChangeFilterStatus}>
            <MuiMenuItem value="ALL">All Statuses</MuiMenuItem>
            <MuiMenuItem value="DRAFT">Draft</MuiMenuItem>
            <MuiMenuItem value="PENDING">Pending</MuiMenuItem>
            <MuiMenuItem value="COMPLETED">Completed</MuiMenuItem>
            <MuiMenuItem value="CANCELLED">Cancelled</MuiMenuItem>
          </Select>
        </FormControl>

        {/* Date range filters */}
        <TextField
          label="Start Date"
          type="date"
          size="small"
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          size="small"
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <Button variant="contained" fullWidth onClick={handleFilterClose}>
          Apply Filters
        </Button>
      </Popover>

      {/* ---- Create New Order Dialog ---- */}
      {createDialogOpen && (
        <CreateOrderDialog
          open={createDialogOpen}
          onClose={() => {
            setCreateDialogOpen(false);
            refetch();
          }}
        />
      )}

      {/* ---- Detail Side Panel ---- */}
      <Drawer
        anchor="right"
        open={detailPanelOpen}
        onClose={handleCloseDetailPanel}
        PaperProps={{
          sx: { width: isSmallScreen ? '100%' : 480, p: 3 },
        }}
      >
        {selectedOrder ? (
          <Stack spacing={2} height="100%">
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" fontWeight={600}>
                Order Details
              </Typography>
              <IconButton onClick={handleCloseDetailPanel}>
                <CancelIcon />
              </IconButton>
            </Stack>

            <Stack spacing={1} mt={2}>
              <Typography variant="body2" color="text.secondary">
                Invoice No: <strong>{selectedOrder.invoiceNumber}</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Order Date:{' '}
                {selectedOrder.orderDate
                  ? format(new Date(selectedOrder.orderDate), 'dd MMM yyyy')
                  : 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Customer:{' '}
                {selectedOrder.customer
                  ? `${selectedOrder.customer.firstName} ${selectedOrder.customer.lastName}`
                  : 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Store: {selectedOrder.store ? selectedOrder.store.name : 'N/A'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {statusConfig[selectedOrder.status].label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Amount: ₹
                {Number(selectedOrder.totalAmount).toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>

              {/* 
                Place line items or other relevant details here, 
                and a mechanism to edit them if needed. 
              */}
            </Stack>

            <Box flexGrow={1} />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={handleCloseDetailPanel}>
                Close
              </Button>
              {/* Example button if saving edits directly */}
              <Button
                variant="contained"
                onClick={() => alert('Save changes (if editing is implemented).')}
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
    </Box>
  );
}
