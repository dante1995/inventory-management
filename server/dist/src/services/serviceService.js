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
exports.createService = createService;
exports.getServiceById = getServiceById;
exports.getAllServices = getAllServices;
exports.updateService = updateService;
exports.deleteService = deleteService;
// src/services/serviceService.ts
const index_1 = require("../db/index");
function createService(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.service.create({ data });
    });
}
function getServiceById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.service.findUnique({
            where: { id },
            include: {
                store: true,
                salesOrderServices: true,
            },
        });
    });
}
function getAllServices() {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.service.findMany({
            include: {
                store: true,
            },
        });
    });
}
function updateService(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.service.update({
            where: { id },
            data,
        });
    });
}
function deleteService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.service.delete({
            where: { id },
        });
    });
}
