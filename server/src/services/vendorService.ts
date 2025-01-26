// src/services/vendorService.ts
import { prisma } from '../db/index'
import type { Prisma } from '@prisma/client'

export async function createVendor(data: Prisma.VendorCreateInput) {
  return prisma.vendor.create({ data })
}

export async function getVendorById(id: string) {
  return prisma.vendor.findUnique({
    where: { id },
    include: {
      purchaseOrders: true,
    },
  })
}

export async function getAllVendors() {
  return prisma.vendor.findMany({
    include: {
      purchaseOrders: true,
    },
  })
}

export async function updateVendor(
  id: string,
  data: Prisma.VendorUpdateInput
) {
  return prisma.vendor.update({
    where: { id },
    data,
  })
}

export async function deleteVendor(id: string) {
  return prisma.vendor.delete({
    where: { id },
  })
}
