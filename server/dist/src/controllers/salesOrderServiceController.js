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
exports.getAllSalesOrderServices = getAllSalesOrderServices;
exports.getSalesOrderServiceById = getSalesOrderServiceById;
exports.createSalesOrderService = createSalesOrderService;
exports.updateSalesOrderService = updateSalesOrderService;
exports.deleteSalesOrderService = deleteSalesOrderService;
const salesOrderServiceService_1 = require("../services/salesOrderServiceService");
/**
 * GET /sales-order-services
 */
function getAllSalesOrderServices(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const services = yield (0, salesOrderServiceService_1.getAllSalesOrderServices)();
            return res.status(200).json(services);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * GET /sales-order-services/:id
 */
function getSalesOrderServiceById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const record = yield (0, salesOrderServiceService_1.getSalesOrderServiceById)(id);
            if (!record) {
                return res.status(404).json({ message: 'SalesOrderService not found.' });
            }
            return res.status(200).json(record);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * POST /sales-order-services
 */
function createSalesOrderService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newRecord = yield (0, salesOrderServiceService_1.createSalesOrderService)(req.body);
            return res.status(201).json(newRecord);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * PATCH /sales-order-services/:id
 */
function updateSalesOrderService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, salesOrderServiceService_1.updateSalesOrderService)(id, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * DELETE /sales-order-services/:id
 */
function deleteSalesOrderService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, salesOrderServiceService_1.deleteSalesOrderService)(id);
            return res.status(200).json(deleted);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
