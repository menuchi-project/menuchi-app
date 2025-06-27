import { PrismaClient } from '@prisma/client';
import prismaClient from '../db/prisma';
import { UserCompactIn, UserCompleteOut } from '../types/UserTypes';
import { JWTPayload, UserLogin, ExpressSession } from "../types/AuthTypes";
import bcrypt from 'bcryptjs';
import { RolesEnum } from '../types/Enums';
import jwt from 'jsonwebtoken';
import { InvalidCredentialsError } from '../exceptions/AuthError';

class AuthService {
  constructor(private prisma: PrismaClient = prismaClient) {}

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

  async signin({ phoneNumber, password }: UserLogin): Promise<ExpressSession | never> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        phoneNumber
      },
      include: {
        roles: true,
        restaurants: {
          include: {
            branches: {
              include: {
                backlog: true,
                menus: true
              }
            }
          }
        }
      }
    }).catch((error: Error) => {
      if (error.message.includes('not found'))
        throw new InvalidCredentialsError();
      throw error;
    });

    const isCorrectPassword = await this.comparePassword(password, user?.password!);
    if(!isCorrectPassword) throw new InvalidCredentialsError();

    const roles = user.roles.map(role => role.role) as RolesEnum[];
    const token = this.generateAuthToken({ userId: user.id, roles });

    return {
      accessToken: token,
      user: {
        id: user.id,
        username: user.username,
        phoneNumber: user.phoneNumber,
        restaurants: user.restaurants.map(restaurant => ({
          id: restaurant.id,
          branches: restaurant.branches.map(branch => ({
            id: branch.id,
            backlogId: branch.backlog?.id,
            menus: branch.menus.map(menu => menu.id)
          }))
        }))
      }
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  generateAuthToken(payload: JWTPayload): string {
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY!, { algorithm: 'HS256', expiresIn: '2d' });
  }
}

export default new AuthService();
