import { Request, Response } from 'express'
import {
  getAllSalesOrderServices as getAll,
  getSalesOrderServiceById as getById,
  createSalesOrderService as create,
  updateSalesOrderService as update,
  deleteSalesOrderService as remove
} from '../services/salesOrderServiceService'

/**
 * GET /sales-order-services
 */
export async function getAllSalesOrderServices(req: Request, res: Response) {
  try {
    const services = await getAll()
    return res.status(200).json(services)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET /sales-order-services/:id
 */
export async function getSalesOrderServiceById(req: Request, res: Response) {
  const { id } = req.params
  try {
    const record = await getById(id)
    if (!record) {
      return res.status(404).json({ message: 'SalesOrderService not found.' })
    }
    return res.status(200).json(record)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST /sales-order-services
 */
export async function createSalesOrderService(req: Request, res: Response) {
  try {
    const newRecord = await create(req.body)
    return res.status(201).json(newRecord)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /sales-order-services/:id
 */
export async function updateSalesOrderService(req: Request, res: Response) {
  const { id } = req.params
  try {
    const updated = await update(id, req.body)
    return res.status(200).json(updated)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /sales-order-services/:id
 */
export async function deleteSalesOrderService(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deleted = await remove(id)
    return res.status(200).json(deleted)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
