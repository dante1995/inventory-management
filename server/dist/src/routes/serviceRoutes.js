"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const serviceController_1 = require("../controllers/serviceController");
const router = (0, express_1.Router)();
// GET all Salon Services - URL: /services
router.get('/', serviceController_1.getAllSalonServices);
// GET Salon Service by ID - URL: /services/:id
router.get('/:id', serviceController_1.getSalonServiceById);
// POST create a new Salon Service - URL: /services
router.post('/', serviceController_1.createSalonService);
// PATCH update an existing Salon Service - URL: /services/:id
router.patch('/:id', serviceController_1.updateSalonService);
// DELETE remove a Salon Service - URL: /services/:id
router.delete('/:id', serviceController_1.deleteSalonService);
exports.default = router;
