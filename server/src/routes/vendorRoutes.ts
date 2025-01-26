import { Router } from 'express'
import {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor
} from '../controllers/vendorController'

const router = Router()

// GET all Vendors - URL: /vendors
router.get('/', getAllVendors)

// GET Vendor by ID - URL: /vendors/:id
router.get('/:id', getVendorById)

// POST create a new Vendor - URL: /vendors
router.post('/', createVendor)

// PATCH update an existing Vendor - URL: /vendors/:id
router.patch('/:id', updateVendor)

// DELETE remove a Vendor - URL: /vendors/:id
router.delete('/:id', deleteVendor)

export default router