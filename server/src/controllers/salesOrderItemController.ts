import { Request, Response } from 'express'
import {
  getAllSalesOrderItems as getAll,
  getSalesOrderItemById as getById,
  createSalesOrderItem as create,
  updateSalesOrderItem as update,
  deleteSalesOrderItem as remove
} from '../services/salesOrderItemService'

/**
 * GET /sales-order-items
 */
export async function getAllSalesOrderItems(req: Request, res: Response) {
  try {
    const items = await getAll()
    return res.status(200).json(items)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET /sales-order-items/:id
 */
export async function getSalesOrderItemById(req: Request, res: Response) {
  const { id } = req.params
  try {
    const item = await getById(id)
    if (!item) {
      return res.status(404).json({ message: 'SalesOrderItem not found.' })
    }
    return res.status(200).json(item)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST /sales-order-items
 */
export async function createSalesOrderItem(req: Request, res: Response) {
  try {
    const newItem = await create(req.body)
    return res.status(201).json(newItem)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /sales-order-items/:id
 */
export async function updateSalesOrderItem(req: Request, res: Response) {
  const { id } = req.params
  try {
    const updated = await update(id, req.body)
    return res.status(200).json(updated)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /sales-order-items/:id
 */
export async function deleteSalesOrderItem(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deleted = await remove(id)
    return res.status(200).json(deleted)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
