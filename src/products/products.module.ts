import {Module} from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { UsersModule } from 'src/users/users.module';
// GET:  /api/products

@Module({
    controllers:[ProductsController],
    providers:[ProductsService],
    imports:[UsersModule],
}) //decorator 
export class ProductsModule{}