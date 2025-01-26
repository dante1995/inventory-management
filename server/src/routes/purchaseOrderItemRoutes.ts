import { Router } from 'express'
import {
  getPurchaseOrderItemById,
  createPurchaseOrderItem,
  updatePurchaseOrderItem,
  deletePurchaseOrderItem,
  getAllPurchaseOrderItems
} from '../controllers/purchaseOrderItemController'

const router = Router()

// GET all PurchaseOrderItems - URL: /purchase-order-items
router.get('/', getAllPurchaseOrderItems)

// GET a single PurchaseOrderItem - URL: /purchase-order-items/:id
router.get('/:id', getPurchaseOrderItemById)

// POST create a new PurchaseOrderItem - URL: /purchase-order-items
router.post('/', createPurchaseOrderItem)

// PATCH update an existing PurchaseOrderItem - URL: /purchase-order-items/:id
router.patch('/:id', updatePurchaseOrderItem)

// DELETE remove a PurchaseOrderItem - URL: /purchase-order-items/:id
router.delete('/:id', deletePurchaseOrderItem)

export default router