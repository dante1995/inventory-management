import { Request, Response } from 'express'
import {
  getAllCustomers as getAll,
  getCustomerById as getById,
  createCustomer as create,
  updateCustomer as update,
  deleteCustomer as remove
} from '../services/customerService'

/**
 * GET /customers
 */
export async function getAllCustomers(req: Request, res: Response) {
  try {
    const customers = await getAll()
    return res.status(200).json(customers)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET /customers/:id
 */
export async function getCustomerById(req: Request, res: Response) {
  const { id } = req.params
  try {
    const customer = await getById(id)
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' })
    }
    return res.status(200).json(customer)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST /customers
 */
export async function createCustomer(req: Request, res: Response) {
  try {
    const newCustomer = await create(req.body)
    return res.status(201).json(newCustomer)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * PATCH /customers/:id
 */
export async function updateCustomer(req: Request, res: Response) {
  const { id } = req.params
  try {
    const updated = await update(id, req.body)
    return res.status(200).json(updated)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}

/**
 * DELETE /customers/:id
 */
export async function deleteCustomer(req: Request, res: Response) {
  const { id } = req.params
  try {
    const deleted = await remove(id)
    return res.status(200).json(deleted)
  } catch (error: any) {
    return res.status(400).json({ error: error.message })
  }
}
