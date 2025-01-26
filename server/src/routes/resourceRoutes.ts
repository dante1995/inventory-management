import { Router } from 'express'
import {
  getAllResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource
} from '../controllers/resourceController'

const router = Router()

// GET all Resources - URL: /resources
router.get('/', getAllResources)

// GET Resource by ID - URL: /resources/:id
router.get('/:id', getResourceById)

// POST create a new Resource - URL: /resources
router.post('/', createResource)

// PATCH update an existing Resource - URL: /resources/:id
router.patch('/:id', updateResource)

// DELETE remove a Resource - URL: /resources/:id
router.delete('/:id', deleteResource)

export default router