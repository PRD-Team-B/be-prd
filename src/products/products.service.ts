import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepositoryItf } from './products.repository.interface';
import { ProductsServiceItf } from './products.service.interface';
import { Products } from '@prisma/client';

@Injectable()
export class ProductsService implements ProductsServiceItf {
  constructor(
    @Inject('ProductsRepositoryItf')
    private readonly productsRepository: ProductsRepositoryItf,
  ) {}

  async getOneProduct(id: number): Promise<Products> {}
}
