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
exports.createResource = createResource;
exports.getResourceById = getResourceById;
exports.getAllResources = getAllResources;
exports.updateResource = updateResource;
exports.deleteResource = deleteResource;
// src/services/resourceService.ts
const index_1 = require("../db/index");
function createResource(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.resource.create({ data });
    });
}
function getResourceById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.resource.findUnique({
            where: { id },
            include: {
                companyWorkspace: true,
                assignedStore: true,
                ownedWorkspaces: true,
                managedStores: true,
                performedServices: true,
            },
        });
    });
}
function getAllResources() {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.resource.findMany({
            include: {
                companyWorkspace: true,
                assignedStore: true,
            },
        });
    });
}
function updateResource(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.resource.update({
            where: { id },
            data,
        });
    });
}
function deleteResource(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.resource.delete({
            where: { id },
        });
    });
}
