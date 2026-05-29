import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPass = bcrypt.hashSync(createUserDto.password, salt);

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPass,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      where: { isDelete: false },
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const dataToUpdate: Partial<UpdateUserDto> = { ...updateUserDto };
    const salt = bcrypt.genSaltSync(10);

    if (updateUserDto.password) {
      dataToUpdate.password = bcrypt.hashSync(updateUserDto.password, salt);
    } else {
      delete dataToUpdate.password;
    }

    return this.prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  async remove(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { isDelete: true, deletedAt: new Date() },
    });
  }
}
