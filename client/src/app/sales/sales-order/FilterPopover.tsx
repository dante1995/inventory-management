// FilterPopover.tsx
import React from "react";
import {
  Popover,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem as MuiMenuItem,
  TextField,
  Button,
  SelectChangeEvent,
} from "@mui/material";

interface FilterPopoverProps {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  filterStatus: string;
  onFilterStatusChange: (event: SelectChangeEvent<string>) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  isSmallScreen: boolean;
}

export default function FilterPopover({
  anchorEl,
  onClose,
  filterStatus,
  onFilterStatusChange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isSmallScreen,
}: FilterPopoverProps) {
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{
        sx: { p: 2, width: isSmallScreen ? "90%" : 320 },
      }}
    >
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        Refine Your Orders
      </Typography>
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select value={filterStatus} label="Status" onChange={onFilterStatusChange}>
          <MuiMenuItem value="ALL">All Statuses</MuiMenuItem>
          <MuiMenuItem value="DRAFT">Draft</MuiMenuItem>
          <MuiMenuItem value="PENDING">Pending</MuiMenuItem>
          <MuiMenuItem value="COMPLETED">Completed</MuiMenuItem>
          <MuiMenuItem value="CANCELLED">Cancelled</MuiMenuItem>
        </Select>
      </FormControl>
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
      <Button variant="contained" fullWidth onClick={onClose}>
        Apply Filters
      </Button>
    </Popover>
  );
}
