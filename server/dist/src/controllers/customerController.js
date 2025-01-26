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
exports.getAllCustomers = getAllCustomers;
exports.getCustomerById = getCustomerById;
exports.createCustomer = createCustomer;
exports.updateCustomer = updateCustomer;
exports.deleteCustomer = deleteCustomer;
const customerService_1 = require("../services/customerService");
/**
 * GET /customers
 */
function getAllCustomers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customers = yield (0, customerService_1.getAllCustomers)();
            return res.status(200).json(customers);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * GET /customers/:id
 */
function getCustomerById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const customer = yield (0, customerService_1.getCustomerById)(id);
            if (!customer) {
                return res.status(404).json({ message: 'Customer not found.' });
            }
            return res.status(200).json(customer);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * POST /customers
 */
function createCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newCustomer = yield (0, customerService_1.createCustomer)(req.body);
            return res.status(201).json(newCustomer);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * PATCH /customers/:id
 */
function updateCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, customerService_1.updateCustomer)(id, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * DELETE /customers/:id
 */
function deleteCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, customerService_1.deleteCustomer)(id);
            return res.status(200).json(deleted);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
