"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const storeController_1 = require("../controllers/storeController");
const router = (0, express_1.Router)();
// GET all Stores - URL: /stores
router.get('/', storeController_1.getAllStores);
// GET Store by ID - URL: /stores/:id
router.get('/:id', storeController_1.getStoreById);
// POST create a new Store - URL: /stores
router.post('/', storeController_1.createStore);
// PATCH update an existing Store - URL: /stores/:id
router.patch('/:id', storeController_1.updateStore);
// DELETE remove a Store - URL: /stores/:id
router.delete('/:id', storeController_1.deleteStore);
exports.default = router;
