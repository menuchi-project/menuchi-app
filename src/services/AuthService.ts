import { PrismaClient } from '@prisma/client';
import { UserCompactIn, UserCompleteOut, UserLogin } from '../types/UserTypes';
import bcrypt from 'bcryptjs';
import { RolesEnum } from '../types/Enums';
import { UserNotFound } from '../exceptions/NotFoundError';
import jwt from 'jsonwebtoken';
import { UUID } from '../types/TypeAliases';

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

  async signin({ phoneNumber, password }: UserLogin): Promise<string | never> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        phoneNumber
      },
      include: {
        roles: true
      }
    }).catch((error: Error) => {
      if (error.message.includes('not found'))
        throw new UserNotFound();
      throw error;
    });

    const isCorrectPassword = await this.comparePassword(password, user?.password!);
    if(!isCorrectPassword) throw new UserNotFound();

    const roles = user.roles.map(role => role.role) as RolesEnum[];
    const token = await this.generateAuthToken(user.id, roles);
    return token;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  private async generateAuthToken(userId: UUID, roles: RolesEnum[]) {
    const payload = {
      user: {
        id: userId, roles
      }
    };
    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY!, { algorithm: 'HS256', expiresIn: '2d' });
  }
}

export default new AuthService();
