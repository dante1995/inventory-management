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
exports.getAllCompanyWorkspaces = getAllCompanyWorkspaces;
exports.getCompanyWorkspaceById = getCompanyWorkspaceById;
exports.createCompanyWorkspace = createCompanyWorkspace;
exports.updateCompanyWorkspace = updateCompanyWorkspace;
exports.deleteCompanyWorkspace = deleteCompanyWorkspace;
const companyWorkspaceService_1 = require("../services/companyWorkspaceService");
/**
 * GET /company-workspaces
 * Retrieves all CompanyWorkspaces
 */
function getAllCompanyWorkspaces(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const workspaces = yield (0, companyWorkspaceService_1.getAllCompanyWorkspaces)();
            return res.status(200).json(workspaces);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * GET /company-workspaces/:id
 * Retrieves a single CompanyWorkspace by ID
 */
function getCompanyWorkspaceById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const workspace = yield (0, companyWorkspaceService_1.getCompanyWorkspaceById)(id);
            if (!workspace) {
                return res.status(404).json({ message: 'CompanyWorkspace not found.' });
            }
            return res.status(200).json(workspace);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * POST /company-workspaces
 * Creates a new CompanyWorkspace
 */
function createCompanyWorkspace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newWorkspace = yield (0, companyWorkspaceService_1.createCompanyWorkspace)(req.body);
            return res.status(201).json(newWorkspace);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * PATCH /company-workspaces/:id
 * Updates an existing CompanyWorkspace
 */
function updateCompanyWorkspace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, companyWorkspaceService_1.updateCompanyWorkspace)(id, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * DELETE /company-workspaces/:id
 * Removes an existing CompanyWorkspace
 */
function deleteCompanyWorkspace(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, companyWorkspaceService_1.deleteCompanyWorkspace)(id);
            return res.status(200).json(deleted);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
