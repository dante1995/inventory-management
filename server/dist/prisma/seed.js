"use strict";
/**
 * seed.ts
 *
 * Usage:
 *   npx prisma db seed
 *
 * Ensure tsconfig.json has "resolveJsonModule": true for JSON imports.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// 1. Import JSON seed data
const companyWorkspace_json_1 = __importDefault(require("./seedData/companyWorkspace.json"));
const customer_json_1 = __importDefault(require("./seedData/customer.json"));
const item_json_1 = __importDefault(require("./seedData/item.json"));
const purchaseOrder_json_1 = __importDefault(require("./seedData/purchaseOrder.json"));
const purchaseOrderItem_json_1 = __importDefault(require("./seedData/purchaseOrderItem.json"));
const resource_json_1 = __importDefault(require("./seedData/resource.json"));
const salesOrder_json_1 = __importDefault(require("./seedData/salesOrder.json"));
const salesOrderItem_json_1 = __importDefault(require("./seedData/salesOrderItem.json"));
const salesOrderService_json_1 = __importDefault(require("./seedData/salesOrderService.json"));
const service_json_1 = __importDefault(require("./seedData/service.json"));
const store_json_1 = __importDefault(require("./seedData/store.json"));
const vendor_json_1 = __importDefault(require("./seedData/vendor.json"));
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`[${new Date().toISOString()}] 🌱 Seeding started...`);
        try {
            // ------------------------------
            // DELETE EXISTING DATA (CLEANUP)
            // ------------------------------
            console.log('🧹 Cleaning up existing data...');
            yield prisma.$transaction([
                prisma.salesOrderService.deleteMany(),
                prisma.salesOrderItem.deleteMany(),
                prisma.salesOrder.deleteMany(),
                prisma.purchaseOrderItem.deleteMany(),
                prisma.purchaseOrder.deleteMany(),
                prisma.service.deleteMany(),
                prisma.item.deleteMany(),
                prisma.vendor.deleteMany(),
                prisma.customer.deleteMany(),
                prisma.resource.deleteMany(),
                prisma.store.deleteMany(),
                prisma.companyWorkspace.deleteMany(),
            ]);
            console.log('✅ Database cleaned successfully.');
            // ------------------------------
            // 1) Insert CompanyWorkspaces (ignoring ownerId)
            // ------------------------------
            console.log('🏢 Seeding CompanyWorkspace...');
            const workspacesWithoutOwner = companyWorkspace_json_1.default.map((_a) => {
                var { ownerId } = _a, rest = __rest(_a, ["ownerId"]);
                return rest;
            });
            yield prisma.companyWorkspace.createMany({ data: workspacesWithoutOwner, skipDuplicates: true });
            // ------------------------------
            // 2) Insert Resources
            // ------------------------------
            console.log('👨‍💼 Seeding Resource...');
            const resourcesWithoutStore = resource_json_1.default.map((_a) => {
                var { assignedStoreId, role } = _a, rest = __rest(_a, ["assignedStoreId", "role"]);
                return (Object.assign(Object.assign({}, rest), { role: role }));
            });
            yield prisma.resource.createMany({ data: resourcesWithoutStore, skipDuplicates: true });
            // ------------------------------
            // 2.5) Patch CompanyWorkspace.ownerId
            // ------------------------------
            console.log('🔄 Updating CompanyWorkspace.ownerId...');
            for (const workspace of companyWorkspace_json_1.default) {
                if (workspace.ownerId) {
                    yield prisma.companyWorkspace.update({
                        where: { id: workspace.id },
                        data: { owner: { connect: { id: workspace.ownerId } } },
                    });
                }
            }
            // ------------------------------
            // 3) Insert Stores (ignoring manager)
            // ------------------------------
            console.log('🏬 Seeding Stores...');
            const storesWithoutManager = store_json_1.default.map((_a) => {
                var { storeManagerId } = _a, rest = __rest(_a, ["storeManagerId"]);
                return rest;
            });
            yield prisma.store.createMany({ data: storesWithoutManager, skipDuplicates: true });
            // ------------------------------
            // 4) Patch Store.managerId
            // ------------------------------
            console.log('🛠️ Patching Store.manager...');
            for (const store of store_json_1.default) {
                if (store.storeManagerId) {
                    yield prisma.store.update({
                        where: { id: store.id },
                        data: { manager: { connect: { id: store.storeManagerId } } },
                    });
                }
            }
            // ------------------------------
            // 5) Patch Resource.assignedStoreId
            // ------------------------------
            console.log('🔗 Assigning Resources to Stores...');
            for (const resource of resource_json_1.default) {
                if (resource.assignedStoreId) {
                    yield prisma.resource.update({
                        where: { id: resource.id },
                        data: { assignedStore: { connect: { id: resource.assignedStoreId } } },
                    });
                }
            }
            // ------------------------------
            // 6) Insert Customers
            // ------------------------------
            console.log('👥 Seeding Customers...');
            yield prisma.customer.createMany({ data: customer_json_1.default, skipDuplicates: true });
            // ------------------------------
            // 7) Insert Vendors
            // ------------------------------
            console.log('🏭 Seeding Vendors...');
            yield prisma.vendor.createMany({ data: vendor_json_1.default, skipDuplicates: true });
            // ------------------------------
            // 8) Insert Items
            // ------------------------------
            console.log('📦 Seeding Items...');
            yield prisma.item.createMany({ data: item_json_1.default, skipDuplicates: true });
            // ------------------------------
            // 9) Insert Services
            // ------------------------------
            console.log('💇‍♂️ Seeding Services...');
            yield prisma.service.createMany({ data: service_json_1.default, skipDuplicates: true });
            // ------------------------------
            // 10) Insert Purchase Orders
            // ------------------------------
            console.log('📜 Seeding PurchaseOrders...');
            const purchaseOrdersWithEnumStatus = purchaseOrder_json_1.default.map(po => (Object.assign(Object.assign({}, po), { status: po.status })));
            yield prisma.purchaseOrder.createMany({ data: purchaseOrdersWithEnumStatus, skipDuplicates: true });
            // ------------------------------
            // 11) Insert PurchaseOrderItems
            // ------------------------------
            console.log('📋 Seeding PurchaseOrderItems...');
            yield prisma.purchaseOrderItem.createMany({ data: purchaseOrderItem_json_1.default, skipDuplicates: true });
            // ------------------------------
            // 12) Insert Sales Orders
            // ------------------------------
            console.log('🛒 Seeding SalesOrders...');
            const salesOrdersWithEnumStatus = salesOrder_json_1.default.map(so => (Object.assign(Object.assign({}, so), { status: so.status })));
            yield prisma.salesOrder.createMany({ data: salesOrdersWithEnumStatus, skipDuplicates: true });
            // ------------------------------
            // 13) Insert SalesOrderItems
            // ------------------------------
            console.log('🧾 Seeding SalesOrderItems...');
            yield prisma.salesOrderItem.createMany({ data: salesOrderItem_json_1.default, skipDuplicates: true });
            // ------------------------------
            // 14) Insert SalesOrderServices
            // ------------------------------
            console.log('✂️ Seeding SalesOrderServices...');
            yield prisma.salesOrderService.createMany({ data: salesOrderService_json_1.default, skipDuplicates: true });
            console.log(`[${new Date().toISOString()}] ✅ Seeding complete!`);
        }
        catch (error) {
            console.error('❌ Seeding failed:', error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
// Run the seeding function
main();
