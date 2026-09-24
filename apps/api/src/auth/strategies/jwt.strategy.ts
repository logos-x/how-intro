import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class JwtStrategy {
  private readonly supabase: SupabaseClient;

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.supabase = createClient(
      this.config.getOrThrow<string>('SUPABASE_URL'),
      this.config.getOrThrow<string>('SUPABASE_SERVICE_KEY'),
      { auth: { persistSession: false, autoRefreshToken: false } },
    );
  }

  async validate(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);

    if (error || !data.user) {
      throw new UnauthorizedException();
    }

    const user = await this.prisma.user.findFirst({
      where: { supabaseUserId: data.user.id },
      include: { role: true },
    });

    if (!user || user.isBlocked || user.isDelete) {
      throw new UnauthorizedException();
    }

    return {
      id: user.id,
      email: user.email,
      roleId: user.roleId,
      roleName: user.role?.name ?? '',
    };
  }
}
