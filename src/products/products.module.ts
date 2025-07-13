import {Module} from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
// GET:  /api/products

@Module({
    controllers:[ProductsController],
    providers:[ProductsService],
}) //decorator 
export class ProductsModule{}