import { Request, Response } from 'express'
import {
  getAllResources as getAll,
  getResourceById as getById,
  createResource as create,
  updateResource as update,
  deleteResource as remove
} from '../services/resourceService'

/**
 * GET /resources
 * Retrieves all Resources
 */
export async function getAllResources(req: Request, res: Response) {
  try {
    const resources = await getAll()
    return res.status(200).json(resources)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET /resources/:id
 * Retrieves a single Resource by ID
 */
export async function getResourceById(req: Request, res: Response) {
  const { id } = req.params
  try {
    const resource = await getById(id)
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found.' })
    }
    return res.status(200).json(resource)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST /resources
 * Creates a new Resource
 */
export async function createResource(req: Request, res: Response) {
  try {
    const newResource = await create(req.body)
    return res.status(201).json(newResource)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /resources/:id
 * Updates an existing Resource
 */
export async function updateResource(req: Request, res: Response) {
  const { id } = req.params
  try {
    const updated = await update(id, req.body)
    return res.status(200).json(updated)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /resources/:id
 * Removes an existing Resource
 */
export async function deleteResource(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deleted = await remove(id)
    return res.status(200).json(deleted)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
