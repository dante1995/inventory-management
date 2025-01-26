import { Router } from 'express'
import {
  getAllSalesOrderItems,
  getSalesOrderItemById,
  createSalesOrderItem,
  updateSalesOrderItem,
  deleteSalesOrderItem
} from '../controllers/salesOrderItemController'

const router = Router()

// GET all SalesOrderItems - URL: /sales-order-items
router.get('/', getAllSalesOrderItems)

// GET SalesOrderItem by ID - URL: /sales-order-items/:id
router.get('/:id', getSalesOrderItemById)

// POST create a new SalesOrderItem - URL: /sales-order-items
router.post('/', createSalesOrderItem)

// PATCH update a SalesOrderItem - URL: /sales-order-items/:id
router.patch('/:id', updateSalesOrderItem)

// DELETE remove a SalesOrderItem - URL: /sales-order-items/:id
router.delete('/:id', deleteSalesOrderItem)

export default router