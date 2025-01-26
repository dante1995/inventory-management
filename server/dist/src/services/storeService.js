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
exports.createStore = createStore;
exports.getStoreById = getStoreById;
exports.getAllStores = getAllStores;
exports.updateStore = updateStore;
exports.deleteStore = deleteStore;
// src/services/storeService.ts
const index_1 = require("../db/index");
function createStore(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.store.create({ data });
    });
}
function getStoreById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.store.findUnique({
            where: { id },
            include: {
                companyWorkspace: true,
                manager: true,
                staff: true,
                items: true,
                services: true,
                purchaseOrders: true,
                salesOrders: true,
            },
        });
    });
}
function getAllStores() {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.store.findMany({
            include: {
                manager: true,
                companyWorkspace: true,
            },
        });
    });
}
function updateStore(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.store.update({
            where: { id },
            data,
        });
    });
}
function deleteStore(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.store.delete({
            where: { id },
        });
    });
}
