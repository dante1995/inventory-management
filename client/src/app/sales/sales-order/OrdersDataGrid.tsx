// OrdersDataGrid.tsx
import React from "react";
import { Card } from "@mui/material";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { alpha } from "@mui/material";

interface OrdersDataGridProps<T extends GridValidRowModel> {
  filteredOrders: T[];
  columns: GridColDef<T>[];
  isLoading: boolean;
  theme: any;
}

export default function OrdersDataGrid<T extends GridValidRowModel>({
  filteredOrders,
  columns,
  isLoading,
  theme,
}: OrdersDataGridProps<T>) {
  return (
    <Card>
      <DataGrid<T>
        rows={filteredOrders}
        columns={columns}
        loading={isLoading}
        autoHeight
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
          sorting: {
            sortModel: [{ field: "orderDate", sort: "desc" }],
          },
        }}
        disableRowSelectionOnClick
        sx={{
          border: "none",
          "& .MuiDataGrid-cell": {
            borderColor: theme.palette.divider,
            py: 1.5,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: alpha(theme.palette.primary.main, 0.05),
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: alpha(theme.palette.primary.main, 0.02),
          },
        }}
      />
    </Card>
  );
}
