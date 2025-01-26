"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchaseOrderItems = getAllPurchaseOrderItems;
exports.getPurchaseOrderItemById = getPurchaseOrderItemById;
exports.createPurchaseOrderItem = createPurchaseOrderItem;
exports.updatePurchaseOrderItem = updatePurchaseOrderItem;
exports.deletePurchaseOrderItem = deletePurchaseOrderItem;
const purchaseOrderItemService_1 = require("../services/purchaseOrderItemService");
/**
 * GET /purchase-order-items
 */
function getAllPurchaseOrderItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield (0, purchaseOrderItemService_1.getAllPurchaseOrderItems)();
            return res.status(200).json(items);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * GET /purchase-order-items/:id
 */
function getPurchaseOrderItemById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const item = yield (0, purchaseOrderItemService_1.getPurchaseOrderItemById)(id);
            if (!item) {
                return res.status(404).json({ message: 'PurchaseOrderItem not found.' });
            }
            return res.status(200).json(item);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * POST /purchase-order-items
 */
function createPurchaseOrderItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newItem = yield (0, purchaseOrderItemService_1.createPurchaseOrderItem)(req.body);
            return res.status(201).json(newItem);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * PATCH /purchase-order-items/:id
 */
function updatePurchaseOrderItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, purchaseOrderItemService_1.updatePurchaseOrderItem)(id, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * DELETE /purchase-order-items/:id
 */
function deletePurchaseOrderItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, purchaseOrderItemService_1.deletePurchaseOrderItem)(id);
            return res.status(200).json(deleted);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
