"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salesOrderItemController_1 = require("../controllers/salesOrderItemController");
const router = (0, express_1.Router)();
// GET all SalesOrderItems - URL: /sales-order-items
router.get('/', salesOrderItemController_1.getAllSalesOrderItems);
// GET SalesOrderItem by ID - URL: /sales-order-items/:id
router.get('/:id', salesOrderItemController_1.getSalesOrderItemById);
// POST create a new SalesOrderItem - URL: /sales-order-items
router.post('/', salesOrderItemController_1.createSalesOrderItem);
// PATCH update a SalesOrderItem - URL: /sales-order-items/:id
router.patch('/:id', salesOrderItemController_1.updateSalesOrderItem);
// DELETE remove a SalesOrderItem - URL: /sales-order-items/:id
router.delete('/:id', salesOrderItemController_1.deleteSalesOrderItem);
exports.default = router;
