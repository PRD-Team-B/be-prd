import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './global/middlewares/logger.middleware';
import { PrismaModule } from '../prisma/prisma.module';
import { RateLimitMiddleware } from './global/middlewares/rate-limit.middleware';

@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [AppController],
  providers: [{ provide: 'IAppService', useClass: AppService }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, RateLimitMiddleware).forRoutes('*');
  }
}
