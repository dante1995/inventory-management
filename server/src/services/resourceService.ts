// src/services/resourceService.ts
import { prisma } from '../db/index'
import type { Prisma } from '@prisma/client'

export async function createResource(data: Prisma.ResourceCreateInput) {
  return prisma.resource.create({ data })
}

export async function getResourceById(id: string) {
  return prisma.resource.findUnique({
    where: { id },
    include: {
      companyWorkspace: true,
      assignedStore: true,
      ownedWorkspaces: true,
      managedStores: true,
      performedServices: true,
    },
  })
}

export async function getAllResources() {
  return prisma.resource.findMany({
    include: {
      companyWorkspace: true,
      assignedStore: true,
    },
  })
}

export async function updateResource(
  id: string,
  data: Prisma.ResourceUpdateInput
) {
  return prisma.resource.update({
    where: { id },
    data,
  })
}

export async function deleteResource(id: string) {
  return prisma.resource.delete({
    where: { id },
  })
}
