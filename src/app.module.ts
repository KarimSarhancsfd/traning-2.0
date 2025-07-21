import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import {TypeOrmModule} from '@nestjs/typeorm';
@Module({
  imports: [ProductsModule,  ReviewsModule, UsersModule, TypeOrmModule.forRoot({
    type: 'postgres',
    database: 'nestjs-app-db',
    username: 'postgres',
    password: '123456789',
    port: 5432,
    host: 'localhost',
    synchronize: true,//only for development
    entities:[]

  })],


})
export class AppModule {}
