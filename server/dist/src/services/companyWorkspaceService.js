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
exports.createCompanyWorkspace = createCompanyWorkspace;
exports.getCompanyWorkspaceById = getCompanyWorkspaceById;
exports.getAllCompanyWorkspaces = getAllCompanyWorkspaces;
exports.updateCompanyWorkspace = updateCompanyWorkspace;
exports.deleteCompanyWorkspace = deleteCompanyWorkspace;
// src/services/companyWorkspaceService.ts
const index_1 = require("../db/index");
function createCompanyWorkspace(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.companyWorkspace.create({ data });
    });
}
function getCompanyWorkspaceById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.companyWorkspace.findUnique({
            where: { id },
            include: {
                owner: true,
                stores: true,
                resources: true,
                customers: true,
                vendors: true,
                items: true,
                services: true,
                purchaseOrders: true,
                salesOrders: true,
            },
        });
    });
}
function getAllCompanyWorkspaces() {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.companyWorkspace.findMany();
    });
}
function updateCompanyWorkspace(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.companyWorkspace.update({
            where: { id },
            data,
        });
    });
}
function deleteCompanyWorkspace(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return index_1.prisma.companyWorkspace.delete({
            where: { id },
        });
    });
}
