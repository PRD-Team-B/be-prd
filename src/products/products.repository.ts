import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import {
  OutDetailProduct,
  ProductsRepositoryItf,
} from './products.repository.interface';

@Injectable()
export class ProductsRepository implements ProductsRepositoryItf {
  constructor(private readonly prisma: PrismaService) {}

  async getProduct(id: number): Promise<OutDetailProduct | null> {
    const [product, avg] = await this.prisma.$transaction([
      this.prisma.products.findUnique({
        where: { id },
        include: { reviews: true }
      }),
      this.prisma.reviews.aggregate({
        _avg: { ratings: true },
        where: { products_id: id },
      })
    ]);

    if(!product) return null
    return {
      ...product,
      averageRating: avg._avg.ratings ?? 0
    }
  }
}
