// import { PrismaClient } from '@prisma/client';
// import { BranchCompleteOut } from '../types/RestaurantTypes';

// class BranchService {
//   private prisma: PrismaClient;

//   constructor() {
//     this.prisma = new PrismaClient();
//   }

//   async getBranchWithBacklogById(branchId: string): Promise<BranchCompleteOut | null> {
//     return this.prisma.branch.findUnique({
//       where: {
//         id: branchId,
//       },
//       include: {
//         backlog: true,
//       },
//     });
//   }
// }

// export default new BranchService();
