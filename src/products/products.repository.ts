import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { OutDetailProduct, ProductsRepositoryItf } from './products.repository.interface';

@Injectable()
export class ProductsRepository implements ProductsRepositoryItf {
    constructor(private readonly prisma: PrismaService){}
    
    async getProduct(id: number): Promise<OutDetailProduct | null> {
        
    }
}