// src/services/serviceService.ts
import { prisma } from '../db/index'
import type { Prisma } from '@prisma/client'

export async function createService(data: Prisma.ServiceCreateInput) {
  return prisma.service.create({ data })
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({
    where: { id },
    include: {
      store: true,
      salesOrderServices: true,
    },
  })
}

export async function getAllServices() {
  return prisma.service.findMany({
    include: {
      store: true,
    },
  })
}

export async function updateService(
  id: string,
  data: Prisma.ServiceUpdateInput
) {
  return prisma.service.update({
    where: { id },
    data,
  })
}

export async function deleteService(id: string) {
  return prisma.service.delete({
    where: { id },
  })
}
