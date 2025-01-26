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
exports.createSalesOrderItem = createSalesOrderItem;
exports.getSalesOrderItemById = getSalesOrderItemById;
exports.getAllSalesOrderItems = getAllSalesOrderItems;
exports.updateSalesOrderItem = updateSalesOrderItem;
exports.deleteSalesOrderItem = deleteSalesOrderItem;
// src/services/salesOrderItemService.ts
const index_1 = require("../db/index");
function createSalesOrderItem(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrderItem.create({ data });
    });
}
function getSalesOrderItemById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrderItem.findUnique({
            where: { id },
            include: {
                salesOrder: true,
                item: true,
            },
        });
    });
}
function getAllSalesOrderItems() {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrderItem.findMany({
            include: {
                salesOrder: true,
                item: true,
            },
        });
    });
}
function updateSalesOrderItem(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrderItem.update({
            where: { id },
            data,
        });
    });
}
function deleteSalesOrderItem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrderItem.delete({
            where: { id },
        });
    });
}
