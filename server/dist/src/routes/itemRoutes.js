"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemController_1 = require("../controllers/itemController");
const router = (0, express_1.Router)();
// GET all Items - URL: /items
router.get('/', itemController_1.getAllItems);
// GET Item by ID - URL: /items/:id
router.get('/:id', itemController_1.getItemById);
// POST create a new Item - URL: /items
router.post('/', itemController_1.createItem);
// PATCH update an existing Item - URL: /items/:id
router.patch('/:id', itemController_1.updateItem);
// DELETE remove an Item - URL: /items/:id
router.delete('/:id', itemController_1.deleteItem);
exports.default = router;
