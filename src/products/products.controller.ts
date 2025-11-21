import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsServiceItf } from './products.service.interface';
import { Products } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('ProductsServiceItf')
    private readonly productService: ProductsServiceItf,
  ) {}

  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Products> {}
}
