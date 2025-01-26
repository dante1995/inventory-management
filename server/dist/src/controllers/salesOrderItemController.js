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
exports.getAllSalesOrderItems = getAllSalesOrderItems;
exports.getSalesOrderItemById = getSalesOrderItemById;
exports.createSalesOrderItem = createSalesOrderItem;
exports.updateSalesOrderItem = updateSalesOrderItem;
exports.deleteSalesOrderItem = deleteSalesOrderItem;
const salesOrderItemService_1 = require("../services/salesOrderItemService");
/**
 * GET /sales-order-items
 */
function getAllSalesOrderItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield (0, salesOrderItemService_1.getAllSalesOrderItems)();
            return res.status(200).json(items);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * GET /sales-order-items/:id
 */
function getSalesOrderItemById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const item = yield (0, salesOrderItemService_1.getSalesOrderItemById)(id);
            if (!item) {
                return res.status(404).json({ message: 'SalesOrderItem not found.' });
            }
            return res.status(200).json(item);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * POST /sales-order-items
 */
function createSalesOrderItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newItem = yield (0, salesOrderItemService_1.createSalesOrderItem)(req.body);
            return res.status(201).json(newItem);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * PATCH /sales-order-items/:id
 */
function updateSalesOrderItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, salesOrderItemService_1.updateSalesOrderItem)(id, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * DELETE /sales-order-items/:id
 */
function deleteSalesOrderItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, salesOrderItemService_1.deleteSalesOrderItem)(id);
            return res.status(200).json(deleted);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
