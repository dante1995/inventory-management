import { Router } from 'express'
import {
  getAllSalonServices,
  getSalonServiceById,
  createSalonService,
  updateSalonService,
  deleteSalonService
} from '../controllers/serviceController'

const router = Router()

// GET all Salon Services - URL: /services
router.get('/', getAllSalonServices)

// GET Salon Service by ID - URL: /services/:id
router.get('/:id', getSalonServiceById)

// POST create a new Salon Service - URL: /services
router.post('/', createSalonService)

// PATCH update an existing Salon Service - URL: /services/:id
router.patch('/:id', updateSalonService)

// DELETE remove a Salon Service - URL: /services/:id
router.delete('/:id', deleteSalonService)

export default router