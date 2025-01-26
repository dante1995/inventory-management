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
exports.getAllSalonServices = getAllSalonServices;
exports.getSalonServiceById = getSalonServiceById;
exports.createSalonService = createSalonService;
exports.updateSalonService = updateSalonService;
exports.deleteSalonService = deleteSalonService;
const serviceService_1 = require("../services/serviceService");
/**
 * GET /services
 */
function getAllSalonServices(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const services = yield (0, serviceService_1.getAllServices)();
            return res.status(200).json(services);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * GET /services/:id
 */
function getSalonServiceById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const salonService = yield (0, serviceService_1.getServiceById)(id);
            if (!salonService) {
                return res.status(404).json({ message: 'Service not found.' });
            }
            return res.status(200).json(salonService);
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    });
}
/**
 * POST /services
 */
function createSalonService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newService = yield (0, serviceService_1.createService)(req.body);
            return res.status(201).json(newService);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * PATCH /services/:id
 */
function updateSalonService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const updated = yield (0, serviceService_1.updateService)(id, req.body);
            return res.status(200).json(updated);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
/**
 * DELETE /services/:id
 */
function deleteSalonService(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const deleted = yield (0, serviceService_1.deleteService)(id);
            return res.status(200).json(deleted);
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
