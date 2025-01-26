// src/services/salesOrderService.ts
import { prisma } from '../db/index'
import type { Prisma } from '@prisma/client'

export async function createSalesOrder(data: Prisma.SalesOrderCreateInput) {
  return prisma.salesOrder.create({ data })
}

export async function getSalesOrderById(id: string) {
  return prisma.salesOrder.findUnique({
    where: { id },
    include: {
      customer: true,
      store: true,
      items: true,    // SalesOrderItem[]
      services: true, // SalesOrderService[]
    },
  })
}

export async function getAllSalesOrders() {
  return prisma.salesOrder.findMany({
    include: {
      customer: true,
      store: true,
      items: true,
      services: true,
    },
  })
}

export async function updateSalesOrder(
  id: string,
  data: Prisma.SalesOrderUpdateInput
) {
  return prisma.salesOrder.update({
    where: { id },
    data,
  })
}

export async function deleteSalesOrder(id: string) {
  return prisma.salesOrder.delete({
    where: { id },
  })
}
