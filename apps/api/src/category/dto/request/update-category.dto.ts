import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { CategoryStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateCategoryDto extends PartialType(
  OmitType(CreateCategoryDto, ['type'] as const),
) {}

export class UpdateCategoryStatusDto {
  @IsEnum(CategoryStatus)
  status: CategoryStatus;
}
