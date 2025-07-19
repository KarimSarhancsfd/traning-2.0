import {Module} from '@nestjs/common';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
// import { UsersModule } from 'src/users/users.module';
// GET:  /api/products

// This module imports UsersModule to use UserService in ProductsService
// and exports ProductsService for use in other modules if needed.

@Module({
    controllers:[ProductsController],
    providers:[ProductsService],
    // imports:[UsersModule],
}) //decorator 
export class ProductsModule{}