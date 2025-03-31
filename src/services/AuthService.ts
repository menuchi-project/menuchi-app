import { PrismaClient } from '@prisma/client';
import { UserCompactIn, UserCompleteOut } from '../types/UserTypes';
import bcrypt from 'bcryptjs';
import { RolesEnum } from '../types/Enums';

class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async signup(userDTO: UserCompactIn, roles = [RolesEnum.RestaurantOwner]): Promise<UserCompleteOut | never> {
    userDTO.password = await this.hashPassword(userDTO.password);
    const rolesObj = roles.map((role) => ({ role }));
    return this.prisma.user.create({
      data: {
        ...userDTO,
        roles: {
          create: rolesObj,
        },
        userProfile: {
          create: {},
        },
      },
      select: {
        id: true,
        phoneNumber: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}

export default new AuthService();
