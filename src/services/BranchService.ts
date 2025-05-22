import { PrismaClient } from '@prisma/client';
import prismaClient from '../db/prisma';
import { UUID } from '../types/TypeAliases';
import { BranchNotFound } from '../exceptions/NotFoundError';
import { BranchCompleteOut } from '../types/RestaurantTypes';

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
}

export default new BranchService();
