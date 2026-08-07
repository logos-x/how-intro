import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface UserPayload {
  id: string;
  email: string;
  roleId?: string;
  roleName?: string | null;
}

interface RequestWithUser extends Omit<Request, 'user'> {
  user?: UserPayload;
}

export const CurrentUser = createParamDecorator(
  (data: keyof UserPayload | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      return null;
    }

    if (data) {
      return user[data] ?? null;
    }

    return user;
  },
);
