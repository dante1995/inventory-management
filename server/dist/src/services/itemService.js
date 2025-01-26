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
exports.createItem = createItem;
exports.getItemById = getItemById;
exports.getAllItems = getAllItems;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
// src/services/itemService.ts
const index_1 = require("../db/index");
function createItem(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.item.create({ data });
    });
}
function getItemById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.item.findUnique({
            where: { id },
            include: {
                store: true,
            },
        });
    });
}
function getAllItems() {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.item.findMany({
            include: {
                store: true,
            },
        });
    });
}
function updateItem(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.item.update({
            where: { id },
            data,
        });
    });
}
function deleteItem(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.item.delete({
            where: { id },
        });
    });
}
