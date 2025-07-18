import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';
import { UserService  } from './user.service';
@Module({
  controllers: [UsersController],
  providers: [UserService ],
   exports:[UserService],
})
export class UsersModule {
  // This module can be expanded with providers, controllers, and other configurations as needed.
}
