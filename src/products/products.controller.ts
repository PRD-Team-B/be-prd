import {
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Products } from '@prisma/client';
import { ProductsServiceItf } from './products.service.interface';
import { TransformResponse } from '../global/interceptors/transform-body-res.interceptor';
import { ProductBodyDto } from './dto/res/res-products.dto';
import { CustomExceptionGen } from '../global/exception/exception.general';

@Controller('products')
@TransformResponse(ProductBodyDto)
export class ProductsController {
  private logger = new Logger(ProductsController.name);

  constructor(
    @Inject('ProductsServiceItf')
    private readonly productService: ProductsServiceItf,
  ) {}

  @Get(':id')
  async getProduct(@Param('id', ParseIntPipe) id: number): Promise<Products | undefined> {
    try {
      return await this.productService.getOneProduct(id);
    } catch (error) {
      if (error instanceof CustomExceptionGen) {
        throw error;
      }
      throw new InternalServerErrorException('something wrong on our side');
    }
  }
}
