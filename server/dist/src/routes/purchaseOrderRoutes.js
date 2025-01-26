"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchaseOrderController_1 = require("../controllers/purchaseOrderController");
const router = (0, express_1.Router)();
// GET all PurchaseOrders - URL: /purchase-orders
router.get('/', purchaseOrderController_1.getAllPurchaseOrders);
// GET PurchaseOrder by ID - URL: /purchase-orders/:id
router.get('/:id', purchaseOrderController_1.getPurchaseOrderById);
// POST create a new PurchaseOrder - URL: /purchase-orders
router.post('/', purchaseOrderController_1.createPurchaseOrder);
// PATCH update an existing PurchaseOrder - URL: /purchase-orders/:id
router.patch('/:id', purchaseOrderController_1.updatePurchaseOrder);
// DELETE remove a PurchaseOrder - URL: /purchase-orders/:id
router.delete('/:id', purchaseOrderController_1.deletePurchaseOrder);
exports.default = router;
