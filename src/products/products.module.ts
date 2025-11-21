import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [
    { provide: 'ProductsServiceItf', useClass: ProductsService },
    { provide: 'ProductsRepositoryItf', useClass: ProductsRepository },
  ],
})
export class ProductsModule {}
