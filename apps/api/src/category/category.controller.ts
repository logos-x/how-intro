import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/request/create-category.dto';
import { UpdateCategoryDto } from './dto/request/update-category.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CategoryFilterDto } from './dto/request/category-filter.dto';

@Controller('category')
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @CurrentUser('id') currentUserId: string,
  ) {
    return this.categoryService.create(createCategoryDto, currentUserId);
  }

  @Get()
  findAll(@Query() filterDto: CategoryFilterDto) {
    return this.categoryService.findAll(filterDto);
  }

  @Get(':id')
  findOne(@Param('id') identifier: string) {
    return this.categoryService.findOne(identifier);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @CurrentUser('id') currentUserId: string,
  ) {
    return this.categoryService.update(id, updateCategoryDto, currentUserId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
