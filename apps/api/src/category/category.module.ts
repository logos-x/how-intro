import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SlugGenerateService } from '../common/helper/slug-generate.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, SlugGenerateService],
})
export class CategoryModule {}
