import { PrismaClient } from '@prisma/client';
import prismaClient from '../db/prisma';
import { UUID } from '../types/TypeAliases';
import { BranchNotFound } from '../exceptions/NotFoundError';
import { BranchCompleteOut, UpdateBranchCompactIn } from '../types/RestaurantTypes';

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
}

export default new BranchService();
