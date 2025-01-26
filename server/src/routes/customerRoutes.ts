import { Router } from 'express'
import {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from '../controllers/customerController'

const router = Router()

// GET all Customers - URL: /customers
router.get('/', getAllCustomers)

// GET Customer by ID - URL: /customers/:id
router.get('/:id', getCustomerById)

// POST create a new Customer - URL: /customers
router.post('/', createCustomer)

// PATCH update an existing Customer - URL: /customers/:id
router.patch('/:id', updateCustomer)

// DELETE remove a Customer - URL: /customers/:id
router.delete('/:id', deleteCustomer)

export default router