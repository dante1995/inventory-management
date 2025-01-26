// src/services/customerService.ts
import { prisma } from '../db/index'
import type { Prisma } from '@prisma/client'

export async function createCustomer(data: Prisma.CustomerCreateInput) {
  return prisma.customer.create({ data })
}

export async function getCustomerById(id: string) {
  return prisma.customer.findUnique({
    where: { id },
    include: {
      companyWorkspace: true,
      salesOrders: true,
    },
  })
}

export async function getAllCustomers() {
  return prisma.customer.findMany({
    include: {
      companyWorkspace: true,
    },
  })
}

export async function updateCustomer(
  id: string,
  data: Prisma.CustomerUpdateInput
) {
  return prisma.customer.update({
    where: { id },
    data,
  })
}

export async function deleteCustomer(id: string) {
  return prisma.customer.delete({
    where: { id },
  })
}
