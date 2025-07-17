
import { Module, Controller, Provider } from '@nestjs/common';
 import {ReviewsController} from './reviews.controller';
 import { ReviewsService } from './reviews.service';

@Module({
  controllers:[ReviewsController ],
  providers: [ReviewsService], // Register the ReviewsService as a provider
}) //decorator
export class ReviewsModule {
  // This module can be expanded with providers, controllers, and other configurations as needed.
}