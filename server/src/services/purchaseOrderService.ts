// src/services/purchaseOrderService.ts
import { prisma } from '../db/index'
import type { Prisma, OrderStatus } from '@prisma/client'

export async function createPurchaseOrder(data: Prisma.PurchaseOrderCreateInput) {
  return prisma.purchaseOrder.create({ data })
}

export async function getPurchaseOrderById(id: string) {
  return prisma.purchaseOrder.findUnique({
    where: { id },
    include: {
      vendor: true,
      store: true,
      items: true, // PurchaseOrderItem[] line items
    },
  })
}

export async function getAllPurchaseOrders() {
  return prisma.purchaseOrder.findMany({
    include: {
      vendor: true,
      store: true,
      items: true,
    },
  })
}

export async function updatePurchaseOrder(
  id: string,
  data: Prisma.PurchaseOrderUpdateInput
) {
  return prisma.purchaseOrder.update({
    where: { id },
    data,
  })
}

export async function deletePurchaseOrder(id: string) {
  return prisma.purchaseOrder.delete({
    where: { id },
  })
}
