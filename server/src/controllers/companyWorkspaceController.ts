import { Request, Response } from 'express'
import {
  getAllCompanyWorkspaces as getAll,
  getCompanyWorkspaceById as getById,
  createCompanyWorkspace as create,
  updateCompanyWorkspace as update,
  deleteCompanyWorkspace as remove
} from '../services/companyWorkspaceService'

/**
 * GET /company-workspaces
 * Retrieves all CompanyWorkspaces
 */
export async function getAllCompanyWorkspaces(req: Request, res: Response) {
  try {
    const workspaces = await getAll()
    return res.status(200).json(workspaces)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET /company-workspaces/:id
 * Retrieves a single CompanyWorkspace by ID
 */
export async function getCompanyWorkspaceById(req: Request, res: Response) {
  const { id } = req.params
  try {
    const workspace = await getById(id)
    if (!workspace) {
      return res.status(404).json({ message: 'CompanyWorkspace not found.' })
    }
    return res.status(200).json(workspace)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST /company-workspaces
 * Creates a new CompanyWorkspace
 */
export async function createCompanyWorkspace(req: Request, res: Response) {
  try {
    const newWorkspace = await create(req.body)
    return res.status(201).json(newWorkspace)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /company-workspaces/:id
 * Updates an existing CompanyWorkspace
 */
export async function updateCompanyWorkspace(req: Request, res: Response) {
  const { id } = req.params
  try {
    const updated = await update(id, req.body)
    return res.status(200).json(updated)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /company-workspaces/:id
 * Removes an existing CompanyWorkspace
 */
export async function deleteCompanyWorkspace(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deleted = await remove(id)
    return res.status(200).json(deleted)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
