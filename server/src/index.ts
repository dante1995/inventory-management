import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
/* ROUTE IMPORTS */
import companyWorkspaceRoutes from "./routes/companyWorkspaceRoutes";
import resourceRoutes from "./routes/resourceRoutes";
import storeRoutes from "./routes/storeRoutes";
import customerRoutes from "./routes/customerRoutes";
import vendorRoutes from "./routes/vendorRoutes";
import itemRoutes from "./routes/itemRoutes";
import serviceRoutes from "./routes/serviceRoutes";
import purchaseOrderRoutes from "./routes/purchaseOrderRoutes";
import purchaseOrderItemRoutes from "./routes/purchaseOrderItemRoutes";
import salesOrderRoutes from "./routes/salesOrderRoutes";
import salesOrderItemRoutes from "./routes/salesOrderItemRoutes";
import salesOrderServiceRoutes from "./routes/salesOrderServiceRoutes";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use('/company-workspaces', companyWorkspaceRoutes); // http://localhost:8000/company-workspaces
app.use('/resources', resourceRoutes); // http://localhost:8000/resources
app.use('/stores', storeRoutes); // http://localhost:8000/stores
app.use('/customers', customerRoutes); // http://localhost:8000/customers
app.use('/vendors', vendorRoutes); // http://localhost:8000/vendors
app.use('/items', itemRoutes); // http://localhost:8000/items
app.use('/services', serviceRoutes); // http://localhost:8000/services
app.use('/purchase-orders', purchaseOrderRoutes); // http://localhost:8000/purchase-orders
app.use('/purchase-order-items', purchaseOrderItemRoutes); // http://localhost:8000/purchase-order-items
app.use('/sales-orders', salesOrderRoutes); // http://localhost:8000/sales-orders
app.use('/sales-order-items', salesOrderItemRoutes); // http://localhost:8000/sales-order-items
app.use('/sales-order-services', salesOrderServiceRoutes); // http://localhost:8000/sales-order-services

/* SERVER */
const port = Number(process.env.PORT) || 3001;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
