import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

@Injectable()
export class SlugGenerateService {
  constructor(private readonly prisma: PrismaService) {}

  private generateBaseSlug(input: string): string {
    return slugify(input, {
      locale: 'vi',
      lower: true,
      strict: true,
      trim: true,
    });
  }

  async generateUniqueCategorySlug(
    name: string,
    excludeId?: string,
  ): Promise<string> {
    const baseSlug = this.generateBaseSlug(name);
    let candidate = baseSlug;
    let suffix = 1;
    while (true) {
      const existing = await this.prisma.category.findFirst({
        where: {
          slug: candidate,
          ...(excludeId ? { id: { not: excludeId } } : {}),
        },
        select: { id: true },
      });
      if (!existing) return candidate;

      suffix += 1;
      candidate = `${baseSlug}-${suffix}`;
    }
  }
}
