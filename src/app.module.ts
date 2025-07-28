import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { ReviewsModule } from './reviews/reviews.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'rxjs';
@Module({
  // impotant Note: this is a typo, we canot inject in forroot
  //   imports: [ProductsModule,  ReviewsModule, UsersModule, TypeOrmModule.forRoot({
  //     type: 'postgres',
  //     database: 'nestjs-app-db',
  //     username: 'postgres',
  //     password: '123456789',
  //     port: 5432,
  //     host: 'localhost',
  //     synchronize: false,//only for development
  //     entities:[Product]

  //   }),
  //    ConfigModule. forRoot({
  //     isGlobal: true,
  //     envFilePath: ['.env', '.env.test'],
  //   }),

  // ],

  imports: [
    ProductsModule,
    ReviewsModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          database: config.get<string>('DATABASE_NAME') ,
          username: config.get<string>('DB_USERNAME') ,
          password: config.get<string>('DB_PASSWORD') ,
          port: config.get<number>('DB_PORT') || 5432,
          host: 'localhost',
          // synchronize: true, //only for development
          synchronize: process.env.NODE_ENV !== 'production',
          entities: [Product ],
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`, // or `.env.production` based on your environment
    }),
  ],
})
export class AppModule {}

//go to package jason file and change the start:dev script to make it dynamic
// change this => "start:dev": "set NODE_ENV=development & nest start --watch",//in package jason file to make it dynamic
// "start:dev": "export NODE_ENV=development && nest start --watch", // For Unix-based systems
// make the project environment dynamic
// "start:dev": "nest start --watch", // IGNORE this line, it is not dynamic
// "start:dev": "set NODE_ENV=development & nest start --watch", // For Windows
// "start:dev": "export NODE_ENV=development && nest start --watch", // 
