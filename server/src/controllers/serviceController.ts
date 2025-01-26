import { Request, Response } from 'express'
import {
  getAllServices as getAll,
  getServiceById as getById,
  createService as create,
  updateService as update,
  deleteService as remove
} from '../services/serviceService'

/**
 * GET /services
 */
export async function getAllSalonServices(req: Request, res: Response) {
  try {
    const services = await getAll()
    return res.status(200).json(services)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET /services/:id
 */
export async function getSalonServiceById(req: Request, res: Response) {
  const { id } = req.params
  try {
    const salonService = await getById(id)
    if (!salonService) {
      return res.status(404).json({ message: 'Service not found.' })
    }
    return res.status(200).json(salonService)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST /services
 */
export async function createSalonService(req: Request, res: Response) {
  try {
    const newService = await create(req.body)
    return res.status(201).json(newService)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /services/:id
 */
export async function updateSalonService(req: Request, res: Response) {
  const { id } = req.params
  try {
    const updated = await update(id, req.body)
    return res.status(200).json(updated)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /services/:id
 */
export async function deleteSalonService(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deleted = await remove(id)
    return res.status(200).json(deleted)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
