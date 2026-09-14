import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  controllers: [AuthController],
  providers: [JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
