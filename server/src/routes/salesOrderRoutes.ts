import { Router } from 'express'
import {
  getAllSalesOrders,
  getSalesOrderById,
  createSalesOrder,
  updateSalesOrder,
  deleteSalesOrder
} from '../controllers/salesOrderController'

const router = Router()

// GET all SalesOrders - URL: /sales-orders
router.get('/', getAllSalesOrders)

// GET SalesOrder by ID - URL: /sales-orders/:id
router.get('/:id', getSalesOrderById)

// POST create a new SalesOrder - URL: /sales-orders
router.post('/', createSalesOrder)

// PATCH update an existing SalesOrder - URL: /sales-orders/:id
router.patch('/:id', updateSalesOrder)

// DELETE remove a SalesOrder - URL: /sales-orders/:id
router.delete('/:id', deleteSalesOrder)

export default router