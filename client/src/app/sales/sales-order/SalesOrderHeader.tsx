// SalesOrderHeader.tsx
import React from "react";
import {
  Card,
  Stack,
  Typography,
  Button,
  TextField,
  InputAdornment,
  alpha,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import FilterListIcon from "@mui/icons-material/FilterList";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import SearchIcon from "@mui/icons-material/Search";

interface SalesOrderHeaderProps {
  theme: any;
  isSmallScreen: boolean;
  todayCount: number;
  todayPending: number;
  todayCompleted: number;
  todayCancelled: number;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onFilterOpen: (e: React.MouseEvent<HTMLElement>) => void;
  onRefresh: () => void;
  onNewOrder: () => void;
  onExport: () => void;
}

export default function SalesOrderHeader({
  theme,
  isSmallScreen,
  todayCount,
  todayPending,
  todayCompleted,
  todayCancelled,
  searchQuery,
  setSearchQuery,
  onFilterOpen,
  onRefresh,
  onNewOrder,
  onExport,
}: SalesOrderHeaderProps) {
  return (
    <Card sx={{ p: 2.5 }}>
      <Stack spacing={2}>
        {/* Title + Primary Actions */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          spacing={2}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <ReceiptIcon sx={{ fontSize: 32, color: "primary.main" }} />
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 600, color: theme.palette.text.primary }}
            >
              Sales Orders
            </Typography>
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            width={{ xs: "100%", sm: "auto" }}
          >
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={onRefresh}
              sx={{
                borderColor: alpha(theme.palette.primary.main, 0.2),
                "&:hover": {
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
              onClick={onNewOrder}
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": { backgroundColor: theme.palette.primary.dark },
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
              minWidth: isSmallScreen ? "100%" : 200,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
              minWidth: isSmallScreen ? "100%" : 200,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
              minWidth: isSmallScreen ? "100%" : 200,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
              minWidth: isSmallScreen ? "100%" : 200,
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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

        {/* Search + Filters */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems="stretch"
        >
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
              "& .MuiOutlinedInput-root": {
                backgroundColor: theme.palette.background.paper,
              },
            }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={onFilterOpen}
            sx={{
              minWidth: 120,
              borderColor: alpha(theme.palette.primary.main, 0.2),
              "&:hover": {
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
            onClick={onExport}
            sx={{
              minWidth: 120,
              borderColor: alpha(theme.palette.primary.main, 0.2),
              "&:hover": {
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
  );
}
