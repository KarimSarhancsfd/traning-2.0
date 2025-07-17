import {Module} from '@nestjs/common' ;

 import {UsersController} from './users.controller';
 import {UsersService} from './user.service';
@Module({
  controllers:[UsersController],
  providers:[userService],
})
export class UsersModule {
  // This module can be expanded with providers, controllers, and other configurations as needed.
}