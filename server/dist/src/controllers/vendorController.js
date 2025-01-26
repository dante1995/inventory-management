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
exports.getAllVendors = getAllVendors;
exports.getVendorById = getVendorById;
exports.createVendor = createVendor;
exports.updateVendor = updateVendor;
exports.deleteVendor = deleteVendor;
const vendorService_1 = require("../services/vendorService");
/**
 * GET /vendors
 */
function getAllVendors(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const vendors = yield (0, vendorService_1.getAllVendors)();
            return res.status(200).json(vendors);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * GET /vendors/:id
 */
function getVendorById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const vendor = yield (0, vendorService_1.getVendorById)(id);
            if (!vendor) {
                return res.status(404).json({ message: 'Vendor not found.' });
            }
            return res.status(200).json(vendor);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * POST /vendors
 */
function createVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newVendor = yield (0, vendorService_1.createVendor)(req.body);
            return res.status(201).json(newVendor);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * PATCH /vendors/:id
 */
function updateVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, vendorService_1.updateVendor)(id, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * DELETE /vendors/:id
 */
function deleteVendor(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, vendorService_1.deleteVendor)(id);
            return res.status(200).json(deleted);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
