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
exports.getAllResources = getAllResources;
exports.getResourceById = getResourceById;
exports.createResource = createResource;
exports.updateResource = updateResource;
exports.deleteResource = deleteResource;
const resourceService_1 = require("../services/resourceService");
/**
 * GET /resources
 * Retrieves all Resources
 */
function getAllResources(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const resources = yield (0, resourceService_1.getAllResources)();
            return res.status(200).json(resources);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * GET /resources/:id
 * Retrieves a single Resource by ID
 */
function getResourceById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const resource = yield (0, resourceService_1.getResourceById)(id);
            if (!resource) {
                return res.status(404).json({ message: 'Resource not found.' });
            }
            return res.status(200).json(resource);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * POST /resources
 * Creates a new Resource
 */
function createResource(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newResource = yield (0, resourceService_1.createResource)(req.body);
            return res.status(201).json(newResource);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * PATCH /resources/:id
 * Updates an existing Resource
 */
function updateResource(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, resourceService_1.updateResource)(id, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * DELETE /resources/:id
 * Removes an existing Resource
 */
function deleteResource(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, resourceService_1.deleteResource)(id);
            return res.status(200).json(deleted);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
