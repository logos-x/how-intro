import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/request/create-category.dto';
// import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import { CategoryStatus, Prisma } from '@prisma/client';
import { SlugGenerateService } from '../common/helper/slug-generate.service';
import { CategoryResponseDto } from './dto/response/category-response.dto';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from '../common/interfaces/paginated-result.interface';
import { CategoryFilterDto } from './dto/request/category-filter.dto';
import { PaginationMetaDto } from '../common/dto/pagination-meta.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly slugGenerator: SlugGenerateService,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
    currentUserId: string,
  ): Promise<CategoryResponseDto> {
    const slug = createCategoryDto.customSlug
      ? await this.slugGenerator.generateUniqueCategorySlug(
          createCategoryDto.customSlug,
        )
      : await this.slugGenerator.generateUniqueCategorySlug(
          createCategoryDto.name,
        );
    const category = await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
        slug,
        subtitle: createCategoryDto.subtitle,
        description: createCategoryDto.description,
        coverImageUrl: createCategoryDto.coverImageUrl,
        type: createCategoryDto.type,
        layoutType: createCategoryDto.layoutType,
        status: CategoryStatus.DRAFT,
        startDate: createCategoryDto.startDate,
        endDate: createCategoryDto.endDate,
        createdById: currentUserId,
        updatedById: currentUserId,
      },
      include: { createdBy: true, updatedBy: true },
    });

    return plainToInstance(CategoryResponseDto, category);
  }

  async findAll(
    filterDto: CategoryFilterDto,
  ): Promise<PaginatedResult<CategoryResponseDto>> {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      type,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = filterDto;

    const where: Prisma.CategoryWhereInput = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { slug: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (status) where.status = status;
    if (type) where.type = type;

    const skip = (page - 1) * limit;

    const [categories, totalCount] = await this.prisma.$transaction([
      this.prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        include: { createdBy: true, updatedBy: true },
      }),
      this.prisma.category.count({ where }),
    ]);

    return {
      data: categories.map((cat) => plainToInstance(CategoryResponseDto, cat)),
      meta: new PaginationMetaDto(page, limit, totalCount),
    };
  }

  async findOne(identifier: string): Promise<CategoryResponseDto> {
    const category = await this.prisma.category.findFirst({
      where: {
        OR: [{ id: identifier }, { slug: identifier }],
      },
      include: { createdBy: true, updatedBy: true },
    });

    if (!category) {
      throw new NotFoundException(`Category ${identifier} not found`);
    }

    return plainToInstance(CategoryResponseDto, category);
  }

  async update(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
    currentUserId: string,
  ): Promise<CategoryResponseDto> {
    const existedCategory = await this.prisma.category.findFirst({
      where: { id },
    });
    if (!existedCategory) {
      throw new NotFoundException(`Category ${id} not found`);
    }

    const data: Record<string, unknown> = {
      ...(updateCategoryDto.name != undefined
        ? { name: updateCategoryDto.name }
        : {}),
      ...(updateCategoryDto.subtitle != undefined
        ? { subtitle: updateCategoryDto.subtitle }
        : {}),
      ...(updateCategoryDto.description != undefined
        ? { description: updateCategoryDto.description }
        : {}),
      ...(updateCategoryDto.coverImageUrl != undefined
        ? { coverImageUrl: updateCategoryDto.coverImageUrl }
        : {}),
      ...(updateCategoryDto.layoutType != undefined
        ? { layoutType: updateCategoryDto.layoutType }
        : {}),
      ...(updateCategoryDto.startDate != undefined
        ? { startDate: updateCategoryDto.startDate }
        : {}),
      ...(updateCategoryDto.endDate != undefined
        ? { endDate: updateCategoryDto.endDate }
        : {}),
      updatedById: currentUserId,
    };

    if (updateCategoryDto.customSlug) {
      data.slug = await this.slugGenerator.generateUniqueCategorySlug(
        updateCategoryDto.customSlug,
      );
    } else if (updateCategoryDto.name) {
      data.slug = await this.slugGenerator.generateUniqueCategorySlug(
        updateCategoryDto.name,
      );
    }

    const category = await this.prisma.category.update({
      where: { id },
      data,
      include: { createdBy: true, updatedBy: true },
    });

    return plainToInstance(CategoryResponseDto, category);
  }

  remove(id: string) {
    return this.prisma.category.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });
  }

  // updateStatus(id: string, status: CategoryStatus) {
  //   return this.prisma.category.update({
  //     where: { id },
  //     data: { status: status },
  //   });
  // }
}
