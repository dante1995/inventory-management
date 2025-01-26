// src/services/salesOrderItemService.ts
import { prisma } from '../db/index'
import type { Prisma } from '@prisma/client'

export async function createSalesOrderItem(
  data: Prisma.SalesOrderItemCreateInput
) {
  return prisma.salesOrderItem.create({ data })
}

export async function getSalesOrderItemById(id: string) {
  return prisma.salesOrderItem.findUnique({
    where: { id },
    include: {
      salesOrder: true,
      item: true,
    },
  })
}

export async function getAllSalesOrderItems() {
  return prisma.salesOrderItem.findMany({
    include: {
      salesOrder: true,
      item: true,
    },
  })
}

export async function updateSalesOrderItem(
  id: string,
  data: Prisma.SalesOrderItemUpdateInput
) {
  return prisma.salesOrderItem.update({
    where: { id },
    data,
  })
}

export async function deleteSalesOrderItem(id: string) {
  return prisma.salesOrderItem.delete({
    where: { id },
  })
}
