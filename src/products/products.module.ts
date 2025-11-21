import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [
    { provide: 'ProductsServiceItf', useClass: ProductsService },
    { provide: 'ProductsRepositoryItf', useClass: ProductsRepository },
  ],
})
export class ProductsModule {}
