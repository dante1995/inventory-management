"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salesOrderController_1 = require("../controllers/salesOrderController");
const router = (0, express_1.Router)();
// GET all SalesOrders - URL: /sales-orders
router.get('/', salesOrderController_1.getAllSalesOrders);
// GET SalesOrder by ID - URL: /sales-orders/:id
router.get('/:id', salesOrderController_1.getSalesOrderById);
// POST create a new SalesOrder - URL: /sales-orders
router.post('/', salesOrderController_1.createSalesOrder);
// PATCH update an existing SalesOrder - URL: /sales-orders/:id
router.patch('/:id', salesOrderController_1.updateSalesOrder);
// DELETE remove a SalesOrder - URL: /sales-orders/:id
router.delete('/:id', salesOrderController_1.deleteSalesOrder);
exports.default = router;
