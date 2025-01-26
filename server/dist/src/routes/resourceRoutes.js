"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resourceController_1 = require("../controllers/resourceController");
const router = (0, express_1.Router)();
// GET all Resources - URL: /resources
router.get('/', resourceController_1.getAllResources);
// GET Resource by ID - URL: /resources/:id
router.get('/:id', resourceController_1.getResourceById);
// POST create a new Resource - URL: /resources
router.post('/', resourceController_1.createResource);
// PATCH update an existing Resource - URL: /resources/:id
router.patch('/:id', resourceController_1.updateResource);
// DELETE remove a Resource - URL: /resources/:id
router.delete('/:id', resourceController_1.deleteResource);
exports.default = router;
