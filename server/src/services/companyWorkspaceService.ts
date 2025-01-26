// src/services/companyWorkspaceService.ts
import { prisma } from '../db/index'
import type { Prisma } from '@prisma/client'

export async function createCompanyWorkspace(
  data: Prisma.CompanyWorkspaceCreateInput
) {
  return prisma.companyWorkspace.create({ data })
}

export async function getCompanyWorkspaceById(id: string) {
  return prisma.companyWorkspace.findUnique({
    where: { id },
    include: {
      owner: true,
      stores: true,
      resources: true,
      customers: true,
      vendors: true,
      items: true,
      services: true,
      purchaseOrders: true,
      salesOrders: true,
    },
  })
}

export async function getAllCompanyWorkspaces() {
  return prisma.companyWorkspace.findMany()
}

export async function updateCompanyWorkspace(
  id: string,
  data: Prisma.CompanyWorkspaceUpdateInput
) {
  return prisma.companyWorkspace.update({
    where: { id },
    data,
  })
}

export async function deleteCompanyWorkspace(id: string) {
  return prisma.companyWorkspace.delete({
    where: { id },
  })
}
