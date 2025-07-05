
import { Module, Controller } from '@nestjs/common';
 import {ReviewsController} from './reviews.controller';

@Module({
  controllers:[ReviewsController ]
}) //decorator
export class ReviewsModule {
  // This module can be expanded with providers, controllers, and other configurations as needed.
}