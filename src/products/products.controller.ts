import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Products } from '@prisma/client';
import { ProductsServiceItf } from './products.service.interface';

@Controller('products')
export class ProductsController {
  private logger = new Logger(ProductsController.name);

  constructor(
    @Inject('ProductsServiceItf')
    private readonly productService: ProductsServiceItf,
  ) {}

  @Get(':id')
  async getProduct(@Param('id') id: number): Promise<Products | undefined> {
    try {
      return await this.productService.getOneProduct(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to get product with id ${id}`, error);

      throw new InternalServerErrorException('something wrong on our side');
    }
  }
}
