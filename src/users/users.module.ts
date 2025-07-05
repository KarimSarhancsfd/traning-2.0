import {Module} from '@nestjs/common' ;

 import {UsersController} from './users.controller';
@Module({
  controllers:[UsersController]
})
export class UsersModule {
  // This module can be expanded with providers, controllers, and other configurations as needed.
}