import { Request, Response } from 'express'
import {
  getAllStores as getAll,
  getStoreById as getById,
  createStore as create,
  updateStore as update,
  deleteStore as remove
} from '../services/storeService'

/**
 * GET /stores
 */
export async function getAllStores(req: Request, res: Response) {
  try {
    const stores = await getAll()
    return res.status(200).json(stores)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET /stores/:id
 */
export async function getStoreById(req: Request, res: Response) {
  const { id } = req.params
  try {
    const store = await getById(id)
    if (!store) {
      return res.status(404).json({ message: 'Store not found.' })
    }
    return res.status(200).json(store)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST /stores
 */
export async function createStore(req: Request, res: Response) {
  try {
    const newStore = await create(req.body)
    return res.status(201).json(newStore)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /stores/:id
 */
export async function updateStore(req: Request, res: Response) {
  const { id } = req.params
  try {
    const updated = await update(id, req.body)
    return res.status(200).json(updated)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /stores/:id
 */
export async function deleteStore(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deleted = await remove(id)
    return res.status(200).json(deleted)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
