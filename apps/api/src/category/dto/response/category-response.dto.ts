import { CategoryStatus, CategoryType, LayoutType } from '@prisma/client';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}

@Exclude()
export class CategoryResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  slug: string;

  @Expose()
  subtitle?: string | null = null;

  @Expose()
  description?: string | null = null;

  @Expose()
  coverImageUrl?: string | null = null;

  @Expose()
  type: CategoryType;

  @Expose()
  layoutType: LayoutType;

  @Expose()
  status: CategoryStatus;

  @Expose()
  displayOrder: number;

  @Expose()
  isPinned: boolean;

  @Expose()
  @Type(() => Date)
  startDate: Date | null = null;

  @Expose()
  @Type(() => Date)
  endDate: Date | null = null;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt?: Date | null = null;

  @Expose()
  @Type(() => UserResponseDto)
  createdBy?: UserResponseDto;

  @Expose()
  @Type(() => UserResponseDto)
  updatedBy?: UserResponseDto;
}
