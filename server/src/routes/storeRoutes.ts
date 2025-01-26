import { Router } from 'express'
import {
  getAllStores,
  getStoreById,
  createStore,
  updateStore,
  deleteStore
} from '../controllers/storeController'

const router = Router()

// GET all Stores - URL: /stores
router.get('/', getAllStores)

// GET Store by ID - URL: /stores/:id
router.get('/:id', getStoreById)

// POST create a new Store - URL: /stores
router.post('/', createStore)

// PATCH update an existing Store - URL: /stores/:id
router.patch('/:id', updateStore)

// DELETE remove a Store - URL: /stores/:id
router.delete('/:id', deleteStore)

export default router