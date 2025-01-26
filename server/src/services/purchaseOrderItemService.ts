// src/services/purchaseOrderItemService.ts
import { prisma } from '../db/index'
import type { Prisma } from '@prisma/client'

export async function createPurchaseOrderItem(
  data: Prisma.PurchaseOrderItemCreateInput
) {
  return prisma.purchaseOrderItem.create({ data })
}

export async function getPurchaseOrderItemById(id: string) {
  return prisma.purchaseOrderItem.findUnique({
    where: { id },
    include: {
      purchaseOrder: true,
      item: true,
    },
  })
}

export async function getAllPurchaseOrderItems() {
  return prisma.purchaseOrderItem.findMany({
    include: {
      purchaseOrder: true,
      item: true,
    },
  })
}

export async function updatePurchaseOrderItem(
  id: string,
  data: Prisma.PurchaseOrderItemUpdateInput
) {
  return prisma.purchaseOrderItem.update({
    where: { id },
    data,
  })
}

export async function deletePurchaseOrderItem(id: string) {
  return prisma.purchaseOrderItem.delete({
    where: { id },
  })
}
