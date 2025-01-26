import { Router } from 'express'
import {
  getAllSalesOrderServices,
  getSalesOrderServiceById,
  createSalesOrderService,
  updateSalesOrderService,
  deleteSalesOrderService
} from '../controllers/salesOrderServiceController'

const router = Router()

// GET all SalesOrderServices - URL: /sales-order-services
router.get('/', getAllSalesOrderServices)

// GET SalesOrderService by ID - URL: /sales-order-services/:id
router.get('/:id', getSalesOrderServiceById)

// POST create a new SalesOrderService - URL: /sales-order-services
router.post('/', createSalesOrderService)

// PATCH update an existing SalesOrderService - URL: /sales-order-services/:id
router.patch('/:id', updateSalesOrderService)

// DELETE remove a SalesOrderService - URL: /sales-order-services/:id
router.delete('/:id', deleteSalesOrderService)

export default router