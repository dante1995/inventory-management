"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const salesOrderServiceController_1 = require("../controllers/salesOrderServiceController");
const router = (0, express_1.Router)();
// GET all SalesOrderServices - URL: /sales-order-services
router.get('/', salesOrderServiceController_1.getAllSalesOrderServices);
// GET SalesOrderService by ID - URL: /sales-order-services/:id
router.get('/:id', salesOrderServiceController_1.getSalesOrderServiceById);
// POST create a new SalesOrderService - URL: /sales-order-services
router.post('/', salesOrderServiceController_1.createSalesOrderService);
// PATCH update an existing SalesOrderService - URL: /sales-order-services/:id
router.patch('/:id', salesOrderServiceController_1.updateSalesOrderService);
// DELETE remove a SalesOrderService - URL: /sales-order-services/:id
router.delete('/:id', salesOrderServiceController_1.deleteSalesOrderService);
exports.default = router;
