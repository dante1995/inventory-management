import { Request, Response } from 'express'
import {
  getAllVendors as getAll,
  getVendorById as getById,
  createVendor as create,
  updateVendor as update,
  deleteVendor as remove
} from '../services/vendorService'

/**
 * GET /vendors
 */
export async function getAllVendors(req: Request, res: Response) {
  try {
    const vendors = await getAll()
    return res.status(200).json(vendors)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET /vendors/:id
 */
export async function getVendorById(req: Request, res: Response) {
  const { id } = req.params
  try {
    const vendor = await getById(id)
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found.' })
    }
    return res.status(200).json(vendor)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST /vendors
 */
export async function createVendor(req: Request, res: Response) {
  try {
    const newVendor = await create(req.body)
    return res.status(201).json(newVendor)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /vendors/:id
 */
export async function updateVendor(req: Request, res: Response) {
  const { id } = req.params
  try {
    const updated = await update(id, req.body)
    return res.status(200).json(updated)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /vendors/:id
 */
export async function deleteVendor(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deleted = await remove(id)
    return res.status(200).json(deleted)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
