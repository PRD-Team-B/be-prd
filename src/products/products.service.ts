import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Products } from '@prisma/client';
import { ProductsRepositoryItf } from './products.repository.interface';
import { ProductsServiceItf } from './products.service.interface';
import { ProductNotFoundException } from './exception/product-notFound-exception';

@Injectable()
export class ProductsService implements ProductsServiceItf {
  constructor(
    @Inject('ProductsRepositoryItf')
    private readonly productsRepository: ProductsRepositoryItf,
  ) {}

  async getOneProduct(id: number): Promise<Products> {
    const data = await this.productsRepository.getProduct(id);
    if (!data) {
      throw new ProductNotFoundException();
    }
    return data;
  }
}
