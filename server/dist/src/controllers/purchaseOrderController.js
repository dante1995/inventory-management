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
exports.getAllPurchaseOrders = getAllPurchaseOrders;
exports.getPurchaseOrderById = getPurchaseOrderById;
exports.createPurchaseOrder = createPurchaseOrder;
exports.updatePurchaseOrder = updatePurchaseOrder;
exports.deletePurchaseOrder = deletePurchaseOrder;
const purchaseOrderService_1 = require("../services/purchaseOrderService");
/**
 * GET /purchase-orders
 */
function getAllPurchaseOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield (0, purchaseOrderService_1.getAllPurchaseOrders)();
            return res.status(200).json(orders);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * GET /purchase-orders/:id
 */
function getPurchaseOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const order = yield (0, purchaseOrderService_1.getPurchaseOrderById)(id);
            if (!order) {
                return res.status(404).json({ message: 'PurchaseOrder not found.' });
            }
            return res.status(200).json(order);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * POST /purchase-orders
 */
function createPurchaseOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newOrder = yield (0, purchaseOrderService_1.createPurchaseOrder)(req.body);
            return res.status(201).json(newOrder);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * PATCH /purchase-orders/:id
 */
function updatePurchaseOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, purchaseOrderService_1.updatePurchaseOrder)(id, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * DELETE /purchase-orders/:id
 */
function deletePurchaseOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, purchaseOrderService_1.deletePurchaseOrder)(id);
            return res.status(200).json(deleted);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
