import { Router } from 'express'
import {
  getAllCompanyWorkspaces,
  getCompanyWorkspaceById,
  createCompanyWorkspace,
  updateCompanyWorkspace,
  deleteCompanyWorkspace
} from '../controllers/companyWorkspaceController'

const router = Router()

// GET all CompanyWorkspaces - URL: /company-workspaces
router.get('/', getAllCompanyWorkspaces)

// GET CompanyWorkspace by ID - URL: /company-workspaces/:id
router.get('/:id', getCompanyWorkspaceById)

// POST create a new CompanyWorkspace - URL: /company-workspaces
router.post('/', createCompanyWorkspace)

// PATCH update an existing CompanyWorkspace - URL: /company-workspaces/:id
router.patch('/:id', updateCompanyWorkspace)

// DELETE remove a CompanyWorkspace - URL: /company-workspaces/:id
router.delete('/:id', deleteCompanyWorkspace)

export default router