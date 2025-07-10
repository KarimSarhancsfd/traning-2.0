import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  NotFoundException,
  Param,
  Body,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';

import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';

type Reviews = {
  id: number;
  products: string;
  review: string;
  rating: number;
};

@Controller('api/reviews')
export class ReviewsController {
  private reviews: Reviews[] = [
    { id: 1, products: 'book', review: 'good', rating: 5 },
    { id: 2, products: 'pen', review: 'bad', rating: 2 },
    { id: 3, products: 'laptop', review: 'excellent', rating: 4.5 },
  ];

  //GET: http://localhost:5000/api/reviews
  //GET: ~/api/reviews
  @Get()
  getAllreviews() {
    return this.reviews;
  }
  //post single element
  @Post()
  public createRview(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: CreateReviewDto,
  ) {
    // console.log(body);
    //     return body
    const newReview: Reviews = {
      id: this.reviews.length + 1,
      products: body.products,
      review: body.review,
      rating: body.rating,
    };
    this.reviews.push(newReview);
    return newReview;
  }

  //add multiple array with multiple object
  //     @Post()
  // createMultipleReviews(@Body() body: CreateReviewDto[]){
  //     const newReviews: Reviews[] = body.map((item, index) => ({
  //         id: this.reviews.length + index + 1,
  //         products: item.products,
  //         review: item.review,
  //         rating: item.rating
  //     }));
  //     this.reviews.push(...newReviews);
  //     return newReviews;
  // }

  @Get('/:id')
  public getReviewById(@Param('id', ParseIntPipe) id: number) {
    const review = this.reviews.find((r) => r.id === id);
    if (!review) {
      throw new NotFoundException('Review not found', {
        description: 'no reviews found',
      });
    }
    return review;
  }

  @Put(':id')
  public updateReview(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    body: UpdateReviewDto,
  ) {
    const index = this.reviews.findIndex((r) => r.id === id);

    if (index === -1) {
      throw new NotFoundException('Review not found', {
        description: 'no reviews found',
      });
    }

    // Update the existing review in-place
    this.reviews[index] = {
      ...this.reviews[index],
      ...body,
    };

    return this.reviews[index]; // Return the updated review
  }

  @Delete(':id')
  public deleteReview(@Param('id', ParseIntPipe) id: number) {
    const review = this.reviews.find((r) => r.id);
    if (!review) {
      throw new NotFoundException('Review not found', {
        description: 'no reviews found',
      });
    }
    return { message: 'product deleted sucessfully' };
  }
}
