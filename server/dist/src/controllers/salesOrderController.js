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
exports.getAllSalesOrders = getAllSalesOrders;
exports.getSalesOrderById = getSalesOrderById;
exports.createSalesOrder = createSalesOrder;
exports.updateSalesOrder = updateSalesOrder;
exports.deleteSalesOrder = deleteSalesOrder;
const salesOrderService_1 = require("../services/salesOrderService");
/**
 * GET /sales-orders
 */
function getAllSalesOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield (0, salesOrderService_1.getAllSalesOrders)();
            return res.status(200).json(orders);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * GET /sales-orders/:id
 */
function getSalesOrderById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const order = yield (0, salesOrderService_1.getSalesOrderById)(id);
            if (!order) {
                return res.status(404).json({ message: 'SalesOrder not found.' });
            }
            return res.status(200).json(order);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * POST /sales-orders
 */
function createSalesOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newOrder = yield (0, salesOrderService_1.createSalesOrder)(req.body);
            return res.status(201).json(newOrder);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * PATCH /sales-orders/:id
 */
function updateSalesOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, salesOrderService_1.updateSalesOrder)(id, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * DELETE /sales-orders/:id
 */
function deleteSalesOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, salesOrderService_1.deleteSalesOrder)(id);
            return res.status(200).json(deleted);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
