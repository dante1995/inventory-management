"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const vendorController_1 = require("../controllers/vendorController");
const router = (0, express_1.Router)();
// GET all Vendors - URL: /vendors
router.get('/', vendorController_1.getAllVendors);
// GET Vendor by ID - URL: /vendors/:id
router.get('/:id', vendorController_1.getVendorById);
// POST create a new Vendor - URL: /vendors
router.post('/', vendorController_1.createVendor);
// PATCH update an existing Vendor - URL: /vendors/:id
router.patch('/:id', vendorController_1.updateVendor);
// DELETE remove a Vendor - URL: /vendors/:id
router.delete('/:id', vendorController_1.deleteVendor);
exports.default = router;
