
import { Module, Controller, Provider, forwardRef } from '@nestjs/common';
 import {ReviewsController} from './reviews.controller';
 import { ReviewsService } from './reviews.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers:[ReviewsController ],
  providers: [ReviewsService], // Register the ReviewsService as a provider
  exports: [ReviewsService], // Export the service so it can be used in other modules
  imports: [forwardRef(() => UsersModule)], // If this module depends on other modules, list them here
   //circular dependency
}) //decorator
export class ReviewsModule {
  // This module can be expanded with providers, controllers, and other configurations as needed.
}