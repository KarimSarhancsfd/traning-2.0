import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
  Delete,
  Req,
  Res,
  Header,
  Headers,
  UseGuards,
  ParseIntPipe,// 'karim' ->throw a  // bad request error so it prevent the requset to talk to database query as it is a bade request  but if we didnot use it i will make a query to database and it will return an exception etc.. according to your exception handler you have made in eif condtion or anything else 
  ValidationPipe,
} from '@nestjs/common';
import {Request,Response} from "express"



import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';


 type Products = {
  id: number;
  title: string;
  price: number;
};


export class ProductsController {
  // GET: http://localhost:5000/api/products
  // GET: ~/api/products
  private products: Products[] = [
    { id: 1, title: 'book', price: 10 },
    { id: 2, title: 'pen', price: 5 },
    { id: 3, title: 'laptop', price: 400 },
  ];


/**
 *  Create new product
 */

//  object-descraturing
  public createProduct({title,price}: CreateProductDto) {

    const newProduct: Products = {
      id: this.products.length + 1,
      title,
     price,
    };

    if(price < 0){
      throw new NotFoundException('price must be greater than 0',{cause:"must not negative"});}
      console.log(CreateProductDto);
    this.products.push(newProduct);
    return newProduct;
  }



  // public createProduct(CreateProductDto: CreateProductDto) {

  //   const newProduct: Products = {
  //     id: this.products.length + 1,
  //     title: CreateProductDto.title,
  //     price: CreateProductDto.price,
  //   };

  //   if(CreateProductDto.price < 0){
  //     throw new NotFoundException('price must be greater than 0',{cause:"must not negative"});}
  //     console.log(CreateProductDto);
  //   this.products.push(newProduct);
  //   return newProduct;
  // }


  /**
 *  Get all product
 */

  @Get()
  public getAllProducts() {
    return this.products;
  }


   /**
    * Get single product by id
    */
  public getOneBy(id: string) {
    console.log(typeof id);
    const product = this.products.find((p) => p.id === parseInt(id));
    if (!product)
      throw new NotFoundException(`product not found ${id}`, {
        description: 'this is description',
      });
    return product;
  }

/**
 * Update product by id
 */
  public updateProduct(
  id: number,
    body: UpdateProductDto,
  ) {
  const index = this.products.findIndex((p) => p.id === id);

  if (index < 0) {
    throw new NotFoundException('Review not found', { description: 'no reviews found' });
  }
  console.log(index);

  // Update the existing review in-place
  this.products[index] = {
    ...this.products[index],
    ...body,
  };

  return this.products[index]; // Return the updated review
}

 /**
  * Delete product by id
  */

  public deleteproduct(@Param('id',ParseIntPipe) id: string) {
    const product = this.products.find((p) => p.id === parseInt(id));
    if (!product)
      throw new NotFoundException(`product not found ${id}`, {
        description: 'the product does not deleted',
      });

    return { message: 'product was deleted' };
  }
}
