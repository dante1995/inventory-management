import { Request, Response } from 'express'
import {
  getAllPurchaseOrders as getAll,
  getPurchaseOrderById as getById,
  createPurchaseOrder as create,
  updatePurchaseOrder as update,
  deletePurchaseOrder as remove
} from '../services/purchaseOrderService'

/**
 * GET /purchase-orders
 */
export async function getAllPurchaseOrders(req: Request, res: Response) {
  try {
    const orders = await getAll()
    return res.status(200).json(orders)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET /purchase-orders/:id
 */
export async function getPurchaseOrderById(req: Request, res: Response) {
  const { id } = req.params
  try {
    const order = await getById(id)
    if (!order) {
      return res.status(404).json({ message: 'PurchaseOrder not found.' })
    }
    return res.status(200).json(order)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST /purchase-orders
 */
export async function createPurchaseOrder(req: Request, res: Response) {
  try {
    const newOrder = await create(req.body)
    return res.status(201).json(newOrder)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /purchase-orders/:id
 */
export async function updatePurchaseOrder(req: Request, res: Response) {
  const { id } = req.params
  try {
    const updated = await update(id, req.body)
    return res.status(200).json(updated)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /purchase-orders/:id
 */
export async function deletePurchaseOrder(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deleted = await remove(id)
    return res.status(200).json(deleted)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
