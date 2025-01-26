import { Router } from 'express'
import {
  getAllPurchaseOrders,
  getPurchaseOrderById,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder
} from '../controllers/purchaseOrderController'

const router = Router()

// GET all PurchaseOrders - URL: /purchase-orders
router.get('/', getAllPurchaseOrders)

// GET PurchaseOrder by ID - URL: /purchase-orders/:id
router.get('/:id', getPurchaseOrderById)

// POST create a new PurchaseOrder - URL: /purchase-orders
router.post('/', createPurchaseOrder)

// PATCH update an existing PurchaseOrder - URL: /purchase-orders/:id
router.patch('/:id', updatePurchaseOrder)

// DELETE remove a PurchaseOrder - URL: /purchase-orders/:id
router.delete('/:id', deletePurchaseOrder)

export default router