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
exports.createVendor = createVendor;
exports.getVendorById = getVendorById;
exports.getAllVendors = getAllVendors;
exports.updateVendor = updateVendor;
exports.deleteVendor = deleteVendor;
// src/services/vendorService.ts
const index_1 = require("../db/index");
function createVendor(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.vendor.create({ data });
    });
}
function getVendorById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.vendor.findUnique({
            where: { id },
            include: {
                purchaseOrders: true,
            },
        });
    });
}
function getAllVendors() {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.vendor.findMany({
            include: {
                purchaseOrders: true,
            },
        });
    });
}
function updateVendor(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.vendor.update({
            where: { id },
            data,
        });
    });
}
function deleteVendor(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.vendor.delete({
            where: { id },
        });
    });
}
