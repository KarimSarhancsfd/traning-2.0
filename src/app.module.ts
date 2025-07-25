import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import {ConfigModule} from '@nestjs/config';
import { config } from 'rxjs';
@Module({
  imports: [ProductsModule,  ReviewsModule, UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    database: 'nestjs-app-db',
    username: 'postgres',
    password: '123456789',
    port: 5432,
    host: 'localhost',
    synchronize: false,//only for development
    entities:[Product]

  }),
   ConfigModule. forRoot({
    isGlobal: true,
    envFilePath: ['.env', '.env.test'],
  }),

],


})
export class AppModule {}
