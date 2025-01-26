// src/services/salesOrderServiceService.ts
import { prisma } from '../db/index'
import type { Prisma } from '@prisma/client'

export async function createSalesOrderService(
  data: Prisma.SalesOrderServiceCreateInput
) {
  return prisma.salesOrderService.create({ data })
}

export async function getSalesOrderServiceById(id: string) {
  return prisma.salesOrderService.findUnique({
    where: { id },
    include: {
      salesOrder: true,
      service: true,
      resource: true,
    },
  })
}

export async function getAllSalesOrderServices() {
  return prisma.salesOrderService.findMany({
    include: {
      salesOrder: true,
      service: true,
      resource: true,
    },
  })
}

export async function updateSalesOrderService(
  id: string,
  data: Prisma.SalesOrderServiceUpdateInput
) {
  return prisma.salesOrderService.update({
    where: { id },
    data,
  })
}

export async function deleteSalesOrderService(id: string) {
  return prisma.salesOrderService.delete({
    where: { id },
  })
}
