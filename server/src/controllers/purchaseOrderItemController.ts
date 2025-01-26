import { Request, Response } from 'express'
import {
  getAllPurchaseOrderItems as getAll,
  getPurchaseOrderItemById as getById,
  createPurchaseOrderItem as create,
  updatePurchaseOrderItem as update,
  deletePurchaseOrderItem as remove
} from '../services/purchaseOrderItemService'

/**
 * GET /purchase-order-items
 */
export async function getAllPurchaseOrderItems(req: Request, res: Response) {
  try {
    const items = await getAll()
    return res.status(200).json(items)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET /purchase-order-items/:id
 */
export async function getPurchaseOrderItemById(req: Request, res: Response) {
  const { id } = req.params
  try {
    const item = await getById(id)
    if (!item) {
      return res.status(404).json({ message: 'PurchaseOrderItem not found.' })
    }
    return res.status(200).json(item)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST /purchase-order-items
 */
export async function createPurchaseOrderItem(req: Request, res: Response) {
  try {
    const newItem = await create(req.body)
    return res.status(201).json(newItem)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /purchase-order-items/:id
 */
export async function updatePurchaseOrderItem(req: Request, res: Response) {
  const { id } = req.params
  try {
    const updated = await update(id, req.body)
    return res.status(200).json(updated)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /purchase-order-items/:id
 */
export async function deletePurchaseOrderItem(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deleted = await remove(id)
    return res.status(200).json(deleted)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
