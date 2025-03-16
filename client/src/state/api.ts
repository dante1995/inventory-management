import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// -------------------------
// Extended Type Definitions
// -------------------------
export interface CompanyWorkspace {
  id: string
  name: string
  ownerId?: string
  address: string
  contactDetails: Record<string, unknown>
  branding?: Record<string, unknown>
  gstin: string
  registrationNumber: string
  createdAt?: string
  updatedAt?: string
}

export type Role = 'OWNER' | 'MANAGER' | 'STAFF'

export interface Resource {
  id: string
  companyWorkspaceId: string
  role: Role
  firstName: string
  lastName: string
  email: string
  phone?: string
  pan?: string
  assignedStoreId?: string
  createdAt?: string
  updatedAt?: string
}

export interface Store {
  id: string
  companyWorkspaceId: string
  name: string
  address: string
  storeManagerId?: string
  openingTime?: string
  closingTime?: string
  storeGstin?: string
  licenseNumber?: string
  createdAt?: string
  updatedAt?: string
}

export interface Customer {
  id: string
  companyWorkspaceId: string
  firstName: string
  lastName: string
  phone: string
  email?: string
  gstin?: string
  loyaltyPoints?: number
  createdAt?: string
  updatedAt?: string
}

export interface Vendor {
  id: string
  companyWorkspaceId: string
  name: string
  type: string[]
  contactDetails: Record<string, unknown>
  gstin: string
  createdAt?: string
  updatedAt?: string
}

export interface Item {
  id: string
  companyWorkspaceId: string
  storeId?: string
  name: string
  category: string
  costPrice: string
  reorderLevel: number
  hsnCode: string
  currentStock: number
  createdAt?: string
  updatedAt?: string
}

export interface SalonService {
  id: string
  companyWorkspaceId: string
  storeId: string
  name: string
  duration: number
  price: string
  requiredItems?: Record<string, unknown>
  sacCode: string
  createdAt?: string
  updatedAt?: string
}

export type OrderStatus = 'DRAFT' | 'PENDING' | 'COMPLETED' | 'CANCELLED'

export interface PurchaseOrder {
  id: string
  companyWorkspaceId: string
  vendorId: string
  storeId: string
  orderDate: string
  status: OrderStatus
  totalAmount: string
  invoiceNumber: string
  isInterState: boolean
  createdAt?: string
  updatedAt?: string
}

export interface PurchaseOrderItem {
  id: string
  purchaseOrderId: string
  itemId: string
  quantity: number
  unitCost: string
  lineTotal: string
  gstRate: string
  lineCgst: string
  lineSgst: string
  lineIgst: string
  createdAt?: string
  updatedAt?: string
}

export interface SalesOrder {
  id: string
  companyWorkspaceId: string
  customerId: string
  storeId: string
  orderDate: string
  status: OrderStatus
  items: SalesOrderItem[]
  totalAmount: number
  isInterState: boolean
  invoiceNumber?: string
  createdAt?: string
  updatedAt?: string
}

export interface SalesOrderItem {
  id: string
  salesOrderId: string
  itemId: string
  quantity: number
  unitPrice: string
  lineTotal: string
  gstRate: string
  lineCgst: string
  lineSgst: string
  lineIgst: string
  createdAt?: string
  updatedAt?: string
}

export interface SalesOrderService {
  id: string
  salesOrderId: string
  serviceId: string
  resourceId: string
  unitPrice: string
  lineTotal: string
  gstRate: string
  lineCgst: string
  lineSgst: string
  lineIgst: string
  createdAt?: string
  updatedAt?: string
}

// --------------
// Advanced Types
// --------------
/** Example for advanced dashboards or analytics */
export interface SalesSummary {
  dateRange: string
  totalSales: number
  totalOrders: number
}
export interface InventoryAlert {
  itemId: string
  itemName: string
  currentStock: number
  reorderLevel: number
}

/** Example for advanced mutation to complete or cancel an order */
export interface OrderStatusUpdatePayload {
  status: 'COMPLETED' | 'CANCELLED'
}

// You can define more advanced interfaces as your domain requires

// ==============================
// RTK Query "createApi" instance
// ==============================
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001',
  }),
  tagTypes: [
    'CompanyWorkspaces',
    'Resources',
    'Stores',
    'Customers',
    'Vendors',
    'Items',
    'SalonServices',
    'PurchaseOrders',
    'PurchaseOrderItems',
    'SalesOrders',
    'SalesOrderItems',
    'SalesOrderServices',
    'Analytics', 
    'InventoryAlerts', 
  ],
  endpoints: (build) => ({
    // =========================================================================
    // 1. CompanyWorkspace
    // =========================================================================
    getCompanyWorkspaces: build.query<CompanyWorkspace[], void>({
      query: () => '/company-workspaces',
      providesTags: ['CompanyWorkspaces'],
    }),
    getCompanyWorkspaceById: build.query<CompanyWorkspace, string>({
      query: (id) => `/company-workspaces/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'CompanyWorkspaces', id }] : ['CompanyWorkspaces'],
    }),
    createCompanyWorkspace: build.mutation<CompanyWorkspace, Partial<CompanyWorkspace>>({
      query: (body) => ({
        url: '/company-workspaces',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CompanyWorkspaces'],
    }),
    updateCompanyWorkspace: build.mutation<CompanyWorkspace, { id: string; data: Partial<CompanyWorkspace> }>({
      query: ({ id, data }) => ({
        url: `/company-workspaces/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['CompanyWorkspaces'],
    }),
    deleteCompanyWorkspace: build.mutation<CompanyWorkspace, string>({
      query: (id) => ({
        url: `/company-workspaces/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CompanyWorkspaces'],
    }),

    // =========================================================================
    // 2. Resource (Users/Employees)
    // =========================================================================
    getResources: build.query<Resource[], void>({
      query: () => '/resources',
      providesTags: ['Resources'],
    }),
    getResourceById: build.query<Resource, string>({
      query: (id) => `/resources/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Resources', id }] : ['Resources'],
    }),
    createResource: build.mutation<Resource, Partial<Resource>>({
      query: (body) => ({
        url: '/resources',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Resources'],
    }),
    updateResource: build.mutation<Resource, { id: string; data: Partial<Resource> }>({
      query: ({ id, data }) => ({
        url: `/resources/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Resources'],
    }),
    deleteResource: build.mutation<Resource, string>({
      query: (id) => ({
        url: `/resources/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Resources'],
    }),

    // =========================================================================
    // 3. Store
    // =========================================================================
    getStores: build.query<Store[], void>({
      query: () => '/stores',
      providesTags: ['Stores'],
    }),
    getStoreById: build.query<Store, string>({
      query: (id) => `/stores/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Stores', id }] : ['Stores'],
    }),
    createStore: build.mutation<Store, Partial<Store>>({
      query: (body) => ({
        url: '/stores',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Stores'],
    }),
    updateStore: build.mutation<Store, { id: string; data: Partial<Store> }>({
      query: ({ id, data }) => ({
        url: `/stores/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Stores'],
    }),
    deleteStore: build.mutation<Store, string>({
      query: (id) => ({
        url: `/stores/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Stores'],
    }),

    // =========================================================================
    // 4. Customer
    // =========================================================================
    getCustomers: build.query<Customer[], void>({
      query: () => '/customers',
      providesTags: ['Customers'],
    }),
    getCustomerById: build.query<Customer, string>({
      query: (id) => `/customers/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Customers', id }] : ['Customers'],
    }),
    createCustomer: build.mutation<Customer, Partial<Customer>>({
      query: (body) => ({
        url: '/customers',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Customers'],
    }),
    updateCustomer: build.mutation<Customer, { id: string; data: Partial<Customer> }>({
      query: ({ id, data }) => ({
        url: `/customers/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Customers'],
    }),
    deleteCustomer: build.mutation<Customer, string>({
      query: (id) => ({
        url: `/customers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Customers'],
    }),

    // =========================================================================
    // 5. Vendor
    // =========================================================================
    getVendors: build.query<Vendor[], void>({
      query: () => '/vendors',
      providesTags: ['Vendors'],
    }),
    getVendorById: build.query<Vendor, string>({
      query: (id) => `/vendors/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Vendors', id }] : ['Vendors'],
    }),
    createVendor: build.mutation<Vendor, Partial<Vendor>>({
      query: (body) => ({
        url: '/vendors',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Vendors'],
    }),
    updateVendor: build.mutation<Vendor, { id: string; data: Partial<Vendor> }>({
      query: ({ id, data }) => ({
        url: `/vendors/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Vendors'],
    }),
    deleteVendor: build.mutation<Vendor, string>({
      query: (id) => ({
        url: `/vendors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Vendors'],
    }),

    // =========================================================================
    // 6. Item (inventory)
    // =========================================================================
    getItems: build.query<Item[], void>({
      query: () => '/items',
      providesTags: ['Items'],
    }),
    getItemById: build.query<Item, string>({
      query: (id) => `/items/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Items', id }] : ['Items'],
    }),
    createItem: build.mutation<Item, Partial<Item>>({
      query: (body) => ({
        url: '/items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Items'],
    }),
    updateItem: build.mutation<Item, { id: string; data: Partial<Item> }>({
      query: ({ id, data }) => ({
        url: `/items/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Items'],
    }),
    deleteItem: build.mutation<Item, string>({
      query: (id) => ({
        url: `/items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Items'],
    }),

    // Example advanced usage: Bulk update item stock
    bulkUpdateItemStock: build.mutation<
      Item[], // returns array of updated items
      { updates: Array<{ itemId: string; newStock: number }> }
    >({
      query: (body) => ({
        url: '/items/bulk-update-stock',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Items'],
    }),

    // =========================================================================
    // 7. Service (salon/spa offering)
    // =========================================================================
    getSalonServices: build.query<SalonService[], void>({
      query: () => '/services',
      providesTags: ['SalonServices'],
    }),
    getSalonServiceById: build.query<SalonService, string>({
      query: (id) => `/services/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'SalonServices', id }] : ['SalonServices'],
    }),
    createSalonService: build.mutation<SalonService, Partial<SalonService>>({
      query: (body) => ({
        url: '/services',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SalonServices'],
    }),
    updateSalonService: build.mutation<SalonService, { id: string; data: Partial<SalonService> }>({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['SalonServices'],
    }),
    deleteSalonService: build.mutation<SalonService, string>({
      query: (id) => ({
        url: `/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SalonServices'],
    }),

    // =========================================================================
    // 8. PurchaseOrder
    // =========================================================================
    getPurchaseOrders: build.query<PurchaseOrder[], void>({
      query: () => '/purchase-orders',
      providesTags: ['PurchaseOrders'],
    }),
    getPurchaseOrderById: build.query<PurchaseOrder, string>({
      query: (id) => `/purchase-orders/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'PurchaseOrders', id }] : ['PurchaseOrders'],
    }),
    createPurchaseOrder: build.mutation<PurchaseOrder, Partial<PurchaseOrder>>({
      query: (body) => ({
        url: '/purchase-orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PurchaseOrders'],
    }),
    updatePurchaseOrder: build.mutation<PurchaseOrder, { id: string; data: Partial<PurchaseOrder> }>({
      query: ({ id, data }) => ({
        url: `/purchase-orders/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PurchaseOrders'],
    }),
    deletePurchaseOrder: build.mutation<PurchaseOrder, string>({
      query: (id) => ({
        url: `/purchase-orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PurchaseOrders'],
    }),

    // Example advanced usage: Cancel or complete purchase order
    updatePurchaseOrderStatus: build.mutation<
      PurchaseOrder,
      { id: string; status: 'CANCELLED' | 'COMPLETED' }
    >({
      query: ({ id, status }) => ({
        url: `/purchase-orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['PurchaseOrders'],
    }),

    // =========================================================================
    // 9. PurchaseOrderItem
    // =========================================================================
    getPurchaseOrderItems: build.query<PurchaseOrderItem[], void>({
      query: () => '/purchase-order-items',
      providesTags: ['PurchaseOrderItems'],
    }),
    getPurchaseOrderItemById: build.query<PurchaseOrderItem, string>({
      query: (id) => `/purchase-order-items/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'PurchaseOrderItems', id }] : ['PurchaseOrderItems'],
    }),
    createPurchaseOrderItem: build.mutation<PurchaseOrderItem, Partial<PurchaseOrderItem>>({
      query: (body) => ({
        url: '/purchase-order-items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['PurchaseOrderItems', 'Items'], // Might also re-fetch Items
    }),
    updatePurchaseOrderItem: build.mutation<PurchaseOrderItem, { id: string; data: Partial<PurchaseOrderItem> }>({
      query: ({ id, data }) => ({
        url: `/purchase-order-items/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['PurchaseOrderItems'],
    }),
    deletePurchaseOrderItem: build.mutation<PurchaseOrderItem, string>({
      query: (id) => ({
        url: `/purchase-order-items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PurchaseOrderItems'],
    }),

    // =========================================================================
    // 10. SalesOrder
    // =========================================================================
    getSalesOrders: build.query<SalesOrder[], void>({
      query: () => '/sales-orders',
      providesTags: ['SalesOrders'],
    }),
    getSalesOrderById: build.query<SalesOrder, string>({
      query: (id) => `/sales-orders/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'SalesOrders', id }] : ['SalesOrders'],
    }),
    createSalesOrder: build.mutation<SalesOrder, Partial<SalesOrder>>({
      query: (body) => ({
        url: '/sales-orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SalesOrders'],
    }),
    updateSalesOrder: build.mutation<SalesOrder, { id: string; data: Partial<SalesOrder> }>({
      query: ({ id, data }) => ({
        url: `/sales-orders/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['SalesOrders'],
    }),
    deleteSalesOrder: build.mutation<SalesOrder, string>({
      query: (id) => ({
        url: `/sales-orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SalesOrders'],
    }),

    // Example advanced usage: Mark order as completed or cancelled
    updateSalesOrderStatus: build.mutation<
      SalesOrder,
      { id: string; status: 'CANCELLED' | 'COMPLETED' }
    >({
      query: ({ id, status }) => ({
        url: `/sales-orders/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['SalesOrders'],
    }),

    // =========================================================================
    // 11. SalesOrderItem
    // =========================================================================
    getSalesOrderItems: build.query<SalesOrderItem[], void>({
      query: () => '/sales-order-items',
      providesTags: ['SalesOrderItems'],
    }),
    getSalesOrderItemById: build.query<SalesOrderItem, string>({
      query: (id) => `/sales-order-items/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'SalesOrderItems', id }] : ['SalesOrderItems'],
    }),
    createSalesOrderItem: build.mutation<SalesOrderItem, Partial<SalesOrderItem>>({
      query: (body) => ({
        url: '/sales-order-items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SalesOrderItems', 'Items'],
    }),
    updateSalesOrderItem: build.mutation<SalesOrderItem, { id: string; data: Partial<SalesOrderItem> }>({
      query: ({ id, data }) => ({
        url: `/sales-order-items/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['SalesOrderItems'],
    }),
    deleteSalesOrderItem: build.mutation<SalesOrderItem, string>({
      query: (id) => ({
        url: `/sales-order-items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SalesOrderItems'],
    }),

    // =========================================================================
    // 12. SalesOrderService (bridge table)
    // =========================================================================
    getSalesOrderServices: build.query<SalesOrderService[], void>({
      query: () => '/sales-order-services',
      providesTags: ['SalesOrderServices'],
    }),
    getSalesOrderServiceById: build.query<SalesOrderService, string>({
      query: (id) => `/sales-order-services/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'SalesOrderServices', id }] : ['SalesOrderServices'],
    }),
    createSalesOrderService: build.mutation<SalesOrderService, Partial<SalesOrderService>>({
      query: (body) => ({
        url: '/sales-order-services',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['SalesOrderServices'],
    }),
    updateSalesOrderService: build.mutation<SalesOrderService, { id: string; data: Partial<SalesOrderService> }>({
      query: ({ id, data }) => ({
        url: `/sales-order-services/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['SalesOrderServices'],
    }),
    deleteSalesOrderService: build.mutation<SalesOrderService, string>({
      query: (id) => ({
        url: `/sales-order-services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SalesOrderServices'],
    }),

    // =========================================================================
    // ADDITIONAL / ADVANCED ENDPOINTS FOR OMS
    // =========================================================================

    // 1) Analytics / Dashboard: e.g., get daily or monthly sales summary
    getSalesSummary: build.query<SalesSummary[], { startDate?: string; endDate?: string }>({
      query: ({ startDate, endDate }) => ({
        url: '/analytics/sales-summary',
        params: { startDate, endDate },
      }),
      providesTags: ['Analytics'],
    }),

    // 2) Inventory alerts: items below reorder level
    getInventoryAlerts: build.query<InventoryAlert[], void>({
      query: () => '/items/alerts-below-reorder',
      providesTags: ['InventoryAlerts'],
    }),
  }),
})

// =================================================================================
// Auto-generated hooks for each endpoint
// =================================================================================
export const {
  // 1. CompanyWorkspace
  useGetCompanyWorkspacesQuery,
  useGetCompanyWorkspaceByIdQuery,
  useCreateCompanyWorkspaceMutation,
  useUpdateCompanyWorkspaceMutation,
  useDeleteCompanyWorkspaceMutation,

  // 2. Resource
  useGetResourcesQuery,
  useGetResourceByIdQuery,
  useCreateResourceMutation,
  useUpdateResourceMutation,
  useDeleteResourceMutation,

  // 3. Store
  useGetStoresQuery,
  useGetStoreByIdQuery,
  useCreateStoreMutation,
  useUpdateStoreMutation,
  useDeleteStoreMutation,

  // 4. Customer
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,

  // 5. Vendor
  useGetVendorsQuery,
  useGetVendorByIdQuery,
  useCreateVendorMutation,
  useUpdateVendorMutation,
  useDeleteVendorMutation,

  // 6. Item
  useGetItemsQuery,
  useGetItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useBulkUpdateItemStockMutation,

  // 7. SalonService
  useGetSalonServicesQuery,
  useGetSalonServiceByIdQuery,
  useCreateSalonServiceMutation,
  useUpdateSalonServiceMutation,
  useDeleteSalonServiceMutation,

  // 8. PurchaseOrder
  useGetPurchaseOrdersQuery,
  useGetPurchaseOrderByIdQuery,
  useCreatePurchaseOrderMutation,
  useUpdatePurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
  useUpdatePurchaseOrderStatusMutation,

  // 9. PurchaseOrderItem
  useGetPurchaseOrderItemsQuery,
  useGetPurchaseOrderItemByIdQuery,
  useCreatePurchaseOrderItemMutation,
  useUpdatePurchaseOrderItemMutation,
  useDeletePurchaseOrderItemMutation,

  // 10. SalesOrder
  useGetSalesOrdersQuery,
  useGetSalesOrderByIdQuery,
  useCreateSalesOrderMutation,
  useUpdateSalesOrderMutation,
  useDeleteSalesOrderMutation,
  useUpdateSalesOrderStatusMutation,

  // 11. SalesOrderItem
  useGetSalesOrderItemsQuery,
  useGetSalesOrderItemByIdQuery,
  useCreateSalesOrderItemMutation,
  useUpdateSalesOrderItemMutation,
  useDeleteSalesOrderItemMutation,

  // 12. SalesOrderService
  useGetSalesOrderServicesQuery,
  useGetSalesOrderServiceByIdQuery,
  useCreateSalesOrderServiceMutation,
  useUpdateSalesOrderServiceMutation,
  useDeleteSalesOrderServiceMutation,

  // Additional / Advanced
  useGetSalesSummaryQuery,
  useGetInventoryAlertsQuery,
} = api
