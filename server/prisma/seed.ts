/**
 * seed.ts
 *
 * Usage:
 *   npx prisma db seed
 *
 * Ensure tsconfig.json has "resolveJsonModule": true for JSON imports.
 */

import { PrismaClient, Role, OrderStatus } from '@prisma/client';

// 1. Import JSON seed data
import companyWorkspaces from './seedData/companyWorkspace.json';
import customers from './seedData/customer.json';
import items from './seedData/item.json';
import purchaseOrders from './seedData/purchaseOrder.json';
import purchaseOrderItems from './seedData/purchaseOrderItem.json';
import resources from './seedData/resource.json';
import salesOrders from './seedData/salesOrder.json';
import salesOrderItems from './seedData/salesOrderItem.json';
import salesOrderServices from './seedData/salesOrderService.json';
import services from './seedData/service.json';
import stores from './seedData/store.json';
import vendors from './seedData/vendor.json';

const prisma = new PrismaClient();

async function main() {
  console.log(`[${new Date().toISOString()}] 🌱 Seeding started...`);

  try {
    // ------------------------------
    // DELETE EXISTING DATA (CLEANUP)
    // ------------------------------
    console.log('🧹 Cleaning up existing data...');
    await prisma.$transaction([
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
    const workspacesWithoutOwner = companyWorkspaces.map(({ ownerId, ...rest }) => rest);
    await prisma.companyWorkspace.createMany({ data: workspacesWithoutOwner, skipDuplicates: true });

    // ------------------------------
    // 2) Insert Resources
    // ------------------------------
    console.log('👨‍💼 Seeding Resource...');
    const resourcesWithoutStore = resources.map(({ assignedStoreId, role, ...rest }) => ({
      ...rest,
      role: role as Role,
    }));
    await prisma.resource.createMany({ data: resourcesWithoutStore, skipDuplicates: true });

    // ------------------------------
    // 2.5) Patch CompanyWorkspace.ownerId
    // ------------------------------
    console.log('🔄 Updating CompanyWorkspace.ownerId...');
    for (const workspace of companyWorkspaces) {
      if (workspace.ownerId) {
        await prisma.companyWorkspace.update({
          where: { id: workspace.id },
          data: { owner: { connect: { id: workspace.ownerId } } },
        });
      }
    }

    // ------------------------------
    // 3) Insert Stores (ignoring manager)
    // ------------------------------
    console.log('🏬 Seeding Stores...');
    const storesWithoutManager = stores.map(({ storeManagerId, ...rest }) => rest);
    await prisma.store.createMany({ data: storesWithoutManager, skipDuplicates: true });

    // ------------------------------
    // 4) Patch Store.managerId
    // ------------------------------
    console.log('🛠️ Patching Store.manager...');
    for (const store of stores) {
      if (store.storeManagerId) {
        await prisma.store.update({
          where: { id: store.id },
          data: { manager: { connect: { id: store.storeManagerId } } },
        });
      }
    }

    // ------------------------------
    // 5) Patch Resource.assignedStoreId
    // ------------------------------
    console.log('🔗 Assigning Resources to Stores...');
    for (const resource of resources) {
      if (resource.assignedStoreId) {
        await prisma.resource.update({
          where: { id: resource.id },
          data: { assignedStore: { connect: { id: resource.assignedStoreId } } },
        });
      }
    }

    // ------------------------------
    // 6) Insert Customers
    // ------------------------------
    console.log('👥 Seeding Customers...');
    await prisma.customer.createMany({ data: customers, skipDuplicates: true });

    // ------------------------------
    // 7) Insert Vendors
    // ------------------------------
    console.log('🏭 Seeding Vendors...');
    await prisma.vendor.createMany({ data: vendors, skipDuplicates: true });

    // ------------------------------
    // 8) Insert Items
    // ------------------------------
    console.log('📦 Seeding Items...');
    await prisma.item.createMany({ data: items, skipDuplicates: true });

    // ------------------------------
    // 9) Insert Services
    // ------------------------------
    console.log('💇‍♂️ Seeding Services...');
    await prisma.service.createMany({ data: services, skipDuplicates: true });

    // ------------------------------
    // 10) Insert Purchase Orders
    // ------------------------------
    console.log('📜 Seeding PurchaseOrders...');
    const purchaseOrdersWithEnumStatus = purchaseOrders.map(po => ({
      ...po,
      status: po.status as OrderStatus,
    }));
    await prisma.purchaseOrder.createMany({ data: purchaseOrdersWithEnumStatus, skipDuplicates: true });

    // ------------------------------
    // 11) Insert PurchaseOrderItems
    // ------------------------------
    console.log('📋 Seeding PurchaseOrderItems...');
    await prisma.purchaseOrderItem.createMany({ data: purchaseOrderItems, skipDuplicates: true });

    // ------------------------------
    // 12) Insert Sales Orders
    // ------------------------------
    console.log('🛒 Seeding SalesOrders...');
    const salesOrdersWithEnumStatus = salesOrders.map(so => ({
      ...so,
      status: so.status as OrderStatus,
    }));
    await prisma.salesOrder.createMany({ data: salesOrdersWithEnumStatus, skipDuplicates: true });

    // ------------------------------
    // 13) Insert SalesOrderItems
    // ------------------------------
    console.log('🧾 Seeding SalesOrderItems...');
    await prisma.salesOrderItem.createMany({ data: salesOrderItems, skipDuplicates: true });

    // ------------------------------
    // 14) Insert SalesOrderServices
    // ------------------------------
    console.log('✂️ Seeding SalesOrderServices...');
    await prisma.salesOrderService.createMany({ data: salesOrderServices, skipDuplicates: true });

    console.log(`[${new Date().toISOString()}] ✅ Seeding complete!`);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeding function
main();
