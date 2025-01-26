// src/services/itemService.ts
import { prisma } from '../db/index'
import type { Prisma } from '@prisma/client'

export async function createItem(data: Prisma.ItemCreateInput) {
  return prisma.item.create({ data })
}

export async function getItemById(id: string) {
  return prisma.item.findUnique({
    where: { id },
    include: {
      store: true,
    },
  })
}

export async function getAllItems() {
  return prisma.item.findMany({
    include: {
      store: true,
    },
  })
}

export async function updateItem(
  id: string,
  data: Prisma.ItemUpdateInput
) {
  return prisma.item.update({
    where: { id },
    data,
  })
}

export async function deleteItem(id: string) {
  return prisma.item.delete({
    where: { id },
  })
}
