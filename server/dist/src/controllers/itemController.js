"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllItems = getAllItems;
exports.getItemById = getItemById;
exports.createItem = createItem;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
const itemService_1 = require("../services/itemService");
/**
 * GET /items
 */
function getAllItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const items = yield (0, itemService_1.getAllItems)();
            return res.status(200).json(items);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * GET /items/:id
 */
function getItemById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const item = yield (0, itemService_1.getItemById)(id);
            if (!item) {
                return res.status(404).json({ message: 'Item not found.' });
            }
            return res.status(200).json(item);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * POST /items
 */
function createItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newItem = yield (0, itemService_1.createItem)(req.body);
            return res.status(201).json(newItem);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * PATCH /items/:id
 */
function updateItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, itemService_1.updateItem)(id, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * DELETE /items/:id
 */
function deleteItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, itemService_1.deleteItem)(id);
            return res.status(200).json(deleted);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
