import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({
      data: createRoleDto,
    });
  }

  async findAll() {
    return this.prisma.role.findMany({
      where: { isDelete: false },
    });
  }

  async findOne(id: string) {
    return this.prisma.role.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({
      where: { id },
      data: updateRoleDto,
    });
  }

  async remove(id: string) {
    return this.prisma.role.update({
      where: { id },
      data: { isDelete: true, deletedAt: new Date() },
    });
  }
}
