import { PrismaClient } from '@prisma/client';
import prismaClient from '../db/prisma';
import { UUID } from '../types/TypeAliases';
import { BranchNotFound } from '../exceptions/NotFoundError';
import { AddressCompactIn, AddressCompleteOut, BranchCompleteOut, OpeningTimesCompactIn, OpeningTimesCompleteOut, UpdateBranchCompactIn } from '../types/RestaurantTypes';

class BranchService {
  constructor(private prisma: PrismaClient = prismaClient) {}

  async getBranch(branchId: UUID): Promise<BranchCompleteOut | never> {
    return this.prisma.branch.findUniqueOrThrow({
      where: {
        id: branchId
      },
      include: {
        backlog: true,
        address: true,
        openingTimes: true
      }
    }).catch((error: Error) => {
      if (error.message.includes('not found'))
        throw new BranchNotFound();
      throw error;
    })
  }

  async updateBranch(branchId: UUID, branchDTO: UpdateBranchCompactIn) {
    return this.prisma.branch.update({
      where: {
        id: branchId
      },
      data: branchDTO
    });
  }

  async createOrUpdateAddress(branchId: UUID, address: AddressCompactIn): Promise<AddressCompleteOut | never> {
    return this.prisma.address.upsert({
      where: {
        branchId
      },
      update: {
        ...address,
      },
      create: {
        branchId,
        ...address,
      },
    }).catch((error: Error) => {
      if (error.message.includes('addresses_branch_id_fkey'))
        throw new BranchNotFound();
      throw error;
    });
  }

  async createOrUpdateOpeningTimes(branchId: UUID, openingTimes: OpeningTimesCompactIn): Promise<OpeningTimesCompleteOut | never> {
    return this.prisma.openingTimes.upsert({
      where: {
        branchId
      },
      update: {
        ...openingTimes,
      },
      create: {
        branchId,
        ...openingTimes,
      },
    }).catch((error: Error) => {
      if (error.message.includes('opening_times_branch_id_fkey'))
        throw new BranchNotFound();
      throw error;
    });
  }
}

export default new BranchService();
