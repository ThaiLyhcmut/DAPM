import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmExModule } from 'src/core/repositories/typeorm-ex.module';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ProductRepository]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
