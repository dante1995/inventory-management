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
exports.getAllStores = getAllStores;
exports.getStoreById = getStoreById;
exports.createStore = createStore;
exports.updateStore = updateStore;
exports.deleteStore = deleteStore;
const storeService_1 = require("../services/storeService");
/**
 * GET /stores
 */
function getAllStores(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stores = yield (0, storeService_1.getAllStores)();
            return res.status(200).json(stores);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * GET /stores/:id
 */
function getStoreById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const store = yield (0, storeService_1.getStoreById)(id);
            if (!store) {
                return res.status(404).json({ message: 'Store not found.' });
            }
            return res.status(200).json(store);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * POST /stores
 */
function createStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newStore = yield (0, storeService_1.createStore)(req.body);
            return res.status(201).json(newStore);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * PATCH /stores/:id
 */
function updateStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, storeService_1.updateStore)(id, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * DELETE /stores/:id
 */
function deleteStore(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, storeService_1.deleteStore)(id);
            return res.status(200).json(deleted);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
