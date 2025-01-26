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
exports.createSalesOrder = createSalesOrder;
exports.getSalesOrderById = getSalesOrderById;
exports.getAllSalesOrders = getAllSalesOrders;
exports.updateSalesOrder = updateSalesOrder;
exports.deleteSalesOrder = deleteSalesOrder;
// src/services/salesOrderService.ts
const index_1 = require("../db/index");
function createSalesOrder(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrder.create({ data });
    });
}
function getSalesOrderById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrder.findUnique({
            where: { id },
            include: {
                customer: true,
                store: true,
                items: true, // SalesOrderItem[]
                services: true, // SalesOrderService[]
            },
        });
    });
}
function getAllSalesOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrder.findMany({
            include: {
                customer: true,
                store: true,
                items: true,
                services: true,
            },
        });
    });
}
function updateSalesOrder(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrder.update({
            where: { id },
            data,
        });
    });
}
function deleteSalesOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrder.delete({
            where: { id },
        });
    });
}
