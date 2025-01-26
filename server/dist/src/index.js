"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
/* ROUTE IMPORTS */
const companyWorkspaceRoutes_1 = __importDefault(require("./routes/companyWorkspaceRoutes"));
const resourceRoutes_1 = __importDefault(require("./routes/resourceRoutes"));
const storeRoutes_1 = __importDefault(require("./routes/storeRoutes"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const vendorRoutes_1 = __importDefault(require("./routes/vendorRoutes"));
const itemRoutes_1 = __importDefault(require("./routes/itemRoutes"));
const serviceRoutes_1 = __importDefault(require("./routes/serviceRoutes"));
const purchaseOrderRoutes_1 = __importDefault(require("./routes/purchaseOrderRoutes"));
const purchaseOrderItemRoutes_1 = __importDefault(require("./routes/purchaseOrderItemRoutes"));
const salesOrderRoutes_1 = __importDefault(require("./routes/salesOrderRoutes"));
const salesOrderItemRoutes_1 = __importDefault(require("./routes/salesOrderItemRoutes"));
const salesOrderServiceRoutes_1 = __importDefault(require("./routes/salesOrderServiceRoutes"));
/* CONFIGURATIONS */
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
/* ROUTES */
app.use('/company-workspaces', companyWorkspaceRoutes_1.default); // http://localhost:8000/company-workspaces
app.use('/resources', resourceRoutes_1.default); // http://localhost:8000/resources
app.use('/stores', storeRoutes_1.default); // http://localhost:8000/stores
app.use('/customers', customerRoutes_1.default); // http://localhost:8000/customers
app.use('/vendors', vendorRoutes_1.default); // http://localhost:8000/vendors
app.use('/items', itemRoutes_1.default); // http://localhost:8000/items
app.use('/services', serviceRoutes_1.default); // http://localhost:8000/services
app.use('/purchase-orders', purchaseOrderRoutes_1.default); // http://localhost:8000/purchase-orders
app.use('/purchase-order-items', purchaseOrderItemRoutes_1.default); // http://localhost:8000/purchase-order-items
app.use('/sales-orders', salesOrderRoutes_1.default); // http://localhost:8000/sales-orders
app.use('/sales-order-items', salesOrderItemRoutes_1.default); // http://localhost:8000/sales-order-items
app.use('/sales-order-services', salesOrderServiceRoutes_1.default); // http://localhost:8000/sales-order-services
/* SERVER */
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});
