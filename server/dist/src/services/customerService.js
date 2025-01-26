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
exports.createCustomer = createCustomer;
exports.getCustomerById = getCustomerById;
exports.getAllCustomers = getAllCustomers;
exports.updateCustomer = updateCustomer;
exports.deleteCustomer = deleteCustomer;
// src/services/customerService.ts
const index_1 = require("../db/index");
function createCustomer(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.customer.create({ data });
    });
}
function getCustomerById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.customer.findUnique({
            where: { id },
            include: {
                companyWorkspace: true,
                salesOrders: true,
            },
        });
    });
}
function getAllCustomers() {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.customer.findMany({
            include: {
                companyWorkspace: true,
            },
        });
    });
}
function updateCustomer(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.customer.update({
            where: { id },
            data,
        });
    });
}
function deleteCustomer(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.customer.delete({
            where: { id },
        });
    });
}
