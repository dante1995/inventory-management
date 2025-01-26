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
exports.createPurchaseOrder = createPurchaseOrder;
exports.getPurchaseOrderById = getPurchaseOrderById;
exports.getAllPurchaseOrders = getAllPurchaseOrders;
exports.updatePurchaseOrder = updatePurchaseOrder;
exports.deletePurchaseOrder = deletePurchaseOrder;
// src/services/purchaseOrderService.ts
const index_1 = require("../db/index");
function createPurchaseOrder(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.purchaseOrder.create({ data });
    });
}
function getPurchaseOrderById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.purchaseOrder.findUnique({
            where: { id },
            include: {
                vendor: true,
                store: true,
                items: true, // PurchaseOrderItem[] line items
            },
        });
    });
}
function getAllPurchaseOrders() {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.purchaseOrder.findMany({
            include: {
                vendor: true,
                store: true,
                items: true,
            },
        });
    });
}
function updatePurchaseOrder(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.purchaseOrder.update({
            where: { id },
            data,
        });
    });
}
function deletePurchaseOrder(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.purchaseOrder.delete({
            where: { id },
        });
    });
}
