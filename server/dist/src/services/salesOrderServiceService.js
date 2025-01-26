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
exports.createSalesOrderService = createSalesOrderService;
exports.getSalesOrderServiceById = getSalesOrderServiceById;
exports.getAllSalesOrderServices = getAllSalesOrderServices;
exports.updateSalesOrderService = updateSalesOrderService;
exports.deleteSalesOrderService = deleteSalesOrderService;
// src/services/salesOrderServiceService.ts
const index_1 = require("../db/index");
function createSalesOrderService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrderService.create({ data });
    });
}
function getSalesOrderServiceById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrderService.findUnique({
            where: { id },
            include: {
                salesOrder: true,
                service: true,
                resource: true,
            },
        });
    });
}
function getAllSalesOrderServices() {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrderService.findMany({
            include: {
                salesOrder: true,
                service: true,
                resource: true,
            },
        });
    });
}
function updateSalesOrderService(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrderService.update({
            where: { id },
            data,
        });
    });
}
function deleteSalesOrderService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.salesOrderService.delete({
            where: { id },
        });
    });
}
