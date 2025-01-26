"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = require("../controllers/customerController");
const router = (0, express_1.Router)();
// GET all Customers - URL: /customers
router.get('/', customerController_1.getAllCustomers);
// GET Customer by ID - URL: /customers/:id
router.get('/:id', customerController_1.getCustomerById);
// POST create a new Customer - URL: /customers
router.post('/', customerController_1.createCustomer);
// PATCH update an existing Customer - URL: /customers/:id
router.patch('/:id', customerController_1.updateCustomer);
// DELETE remove a Customer - URL: /customers/:id
router.delete('/:id', customerController_1.deleteCustomer);
exports.default = router;
