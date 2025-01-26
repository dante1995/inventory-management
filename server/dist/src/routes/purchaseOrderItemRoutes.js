"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const purchaseOrderItemController_1 = require("../controllers/purchaseOrderItemController");
const router = (0, express_1.Router)();
// GET all PurchaseOrderItems - URL: /purchase-order-items
router.get('/', purchaseOrderItemController_1.getAllPurchaseOrderItems);
// GET a single PurchaseOrderItem - URL: /purchase-order-items/:id
router.get('/:id', purchaseOrderItemController_1.getPurchaseOrderItemById);
// POST create a new PurchaseOrderItem - URL: /purchase-order-items
router.post('/', purchaseOrderItemController_1.createPurchaseOrderItem);
// PATCH update an existing PurchaseOrderItem - URL: /purchase-order-items/:id
router.patch('/:id', purchaseOrderItemController_1.updatePurchaseOrderItem);
// DELETE remove a PurchaseOrderItem - URL: /purchase-order-items/:id
router.delete('/:id', purchaseOrderItemController_1.deletePurchaseOrderItem);
exports.default = router;
