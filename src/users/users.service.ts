import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: CreateUserRequestDto): Promise<{ id: string; email: string }> {
    try {
      const hashedPassword: string = await bcrypt.hash(data.password, 10);
      return this.prismaService.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
        select: {
          id: true,
          email: true,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents,@typescript-eslint/no-explicit-any
    } catch (err: Error | any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (err.code === 'P2002') {
        throw new UnprocessableEntityException('User with this email already exists');
      }
      throw err;
    }
  }
}
