import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, RoleModule, UserModule],
  controllers: [],
})
export class AppModule {}
