import { Request, Response } from 'express'
import {
  getAllItems as getAll,
  getItemById as getById,
  createItem as create,
  updateItem as update,
  deleteItem as remove
} from '../services/itemService'

/**
 * GET /items
 */
export async function getAllItems(req: Request, res: Response) {
  try {
    const items = await getAll()
    return res.status(200).json(items)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET /items/:id
 */
export async function getItemById(req: Request, res: Response) {
  const { id } = req.params
  try {
    const item = await getById(id)
    if (!item) {
      return res.status(404).json({ message: 'Item not found.' })
    }
    return res.status(200).json(item)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST /items
 */
export async function createItem(req: Request, res: Response) {
  try {
    const newItem = await create(req.body)
    return res.status(201).json(newItem)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /items/:id
 */
export async function updateItem(req: Request, res: Response) {
  const { id } = req.params
  try {
    const updated = await update(id, req.body)
    return res.status(200).json(updated)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /items/:id
 */
export async function deleteItem(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deleted = await remove(id)
    return res.status(200).json(deleted)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
