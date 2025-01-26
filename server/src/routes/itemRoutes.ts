import { Router } from 'express'
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/itemController'

const router = Router()

// GET all Items - URL: /items
router.get('/', getAllItems)

// GET Item by ID - URL: /items/:id
router.get('/:id', getItemById)

// POST create a new Item - URL: /items
router.post('/', createItem)

// PATCH update an existing Item - URL: /items/:id
router.patch('/:id', updateItem)

// DELETE remove an Item - URL: /items/:id
router.delete('/:id', deleteItem)

export default router