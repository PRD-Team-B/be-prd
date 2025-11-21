import { Controller, Get, Inject, Param } from '@nestjs/common';
import { Products } from '@prisma/client';
import { ProductsServiceItf } from './products.service.interface';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject('ProductsServiceItf')
    private readonly productService: ProductsServiceItf,
  ) {}

  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Products | undefined> {
    try {
      return await this.productService.getOneProduct(id);
    } catch (error) {
      console.error('error', error);
    }
  }
}
