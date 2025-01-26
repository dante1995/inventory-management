// src/services/storeService.ts
import { prisma } from '../db/index'
import type { Prisma } from '@prisma/client'

export async function createStore(data: Prisma.StoreCreateInput) {
  return prisma.store.create({ data })
}

export async function getStoreById(id: string) {
  return prisma.store.findUnique({
    where: { id },
    include: {
      companyWorkspace: true,
      manager: true,
      staff: true,
      items: true,
      services: true,
      purchaseOrders: true,
      salesOrders: true,
    },
  })
}

export async function getAllStores() {
  return prisma.store.findMany({
    include: {
      manager: true,
      companyWorkspace: true,
    },
  })
}

export async function updateStore(
  id: string,
  data: Prisma.StoreUpdateInput
) {
  return prisma.store.update({
    where: { id },
    data,
  })
}

export async function deleteStore(id: string) {
  return prisma.store.delete({
    where: { id },
  })
}
