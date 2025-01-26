import { Request, Response } from 'express'
import {
  getAllSalesOrders as getAll,
  getSalesOrderById as getById,
  createSalesOrder as create,
  updateSalesOrder as update,
  deleteSalesOrder as remove
} from '../services/salesOrderService'

/**
 * GET /sales-orders
 */
export async function getAllSalesOrders(req: Request, res: Response) {
  try {
    const orders = await getAll()
    return res.status(200).json(orders)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET /sales-orders/:id
 */
export async function getSalesOrderById(req: Request, res: Response) {
  const { id } = req.params
  try {
    const order = await getById(id)
    if (!order) {
      return res.status(404).json({ message: 'SalesOrder not found.' })
    }
    return res.status(200).json(order)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST /sales-orders
 */
export async function createSalesOrder(req: Request, res: Response) {
  try {
    const newOrder = await create(req.body)
    return res.status(201).json(newOrder)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /sales-orders/:id
 */
export async function updateSalesOrder(req: Request, res: Response) {
  const { id } = req.params
  try {
    const updated = await update(id, req.body)
    return res.status(200).json(updated)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /sales-orders/:id
 */
export async function deleteSalesOrder(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deleted = await remove(id)
    return res.status(200).json(deleted)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
