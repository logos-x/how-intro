import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CategoryStatus, CategoryType } from '@prisma/client';

export class CategoryFilterDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(CategoryStatus)
  status?: CategoryStatus;

  @IsOptional()
  @IsEnum(CategoryType)
  type?: CategoryType;
}
