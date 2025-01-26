"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const companyWorkspaceController_1 = require("../controllers/companyWorkspaceController");
const router = (0, express_1.Router)();
// GET all CompanyWorkspaces - URL: /company-workspaces
router.get('/', companyWorkspaceController_1.getAllCompanyWorkspaces);
// GET CompanyWorkspace by ID - URL: /company-workspaces/:id
router.get('/:id', companyWorkspaceController_1.getCompanyWorkspaceById);
// POST create a new CompanyWorkspace - URL: /company-workspaces
router.post('/', companyWorkspaceController_1.createCompanyWorkspace);
// PATCH update an existing CompanyWorkspace - URL: /company-workspaces/:id
router.patch('/:id', companyWorkspaceController_1.updateCompanyWorkspace);
// DELETE remove a CompanyWorkspace - URL: /company-workspaces/:id
router.delete('/:id', companyWorkspaceController_1.deleteCompanyWorkspace);
exports.default = router;
