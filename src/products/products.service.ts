

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

 type Products = {
  id: number;
  title: string;
  price: number;
};



export class ProductsService {
      private products: Products[] = [
    { id: 1, title: 'book', price: 10 },
    { id: 2, title: 'pen', price: 5 },
    { id: 3, title: 'laptop', price: 400 },
  ];



    public createProduct( body: CreateProductDto) {
      //whitelist: true
      // this will remove any property that is not defined in the dto
      // forbidNonWhitelisted: true
      // this will throw an error if any property is not defined in the dto
      //and the controller will not be excuted or working 
      //###########################
      //    console.log(body);
      //    return body;
      const newProduct: Products = {
        id: this.products.length + 1,
        title: body.title,
        price: body.price,
      };
  
      if(body.price < 0){
        throw new NotFoundException('price must be greater than 0',{cause:"must not negative"});}
        console.log(body);
      this.products.push(newProduct);
      return newProduct;
    }
  
  
  
  
  

    public getAllProducts() {
      return this.products;
    }
  
    // // GET: ~/api/products
    // @Get('/api/products/:id')
    // public getsingleProducts(@Param() param:any) {
    //   console.log(param);
    //   return 'ok'
    // }
  
    //object destructuring
    // @Get('/api/products/:id')
    // public getsingleProducts(@Param('id') id: string) {
    //   console.log(id);
    //   return 'ok';
    // }
  
 
    public getsingleProducts(id: number) {
      console.log(typeof id);
      const product = this.products.find((p) => p.id );
      if (!product)
        throw new NotFoundException(`product not found ${id}`, {
          description: 'this is description',
        });
      return product;
    }
    //PUT :~/api/product/:id

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
  
  // - this.products[index]: gets the original object at that index (e.g. { id: 2, name: 'pen', rating: 4 })
  // - ...this.products[index]: spreads its existing properties into a new object
  // - ...body: then spreads the new update values (e.g. { rating: 9 })
  // - The final result replaces the original object at that index with the updated version
  
  
  
  //   The ... operator in JavaScript is called the spread operator, and it's one of the most versatile tools in your toolkit. It expands elements of an iterable (like an array or object) into individual elements or properties.
  // 🔍 What it does:
  // - For arrays: It spreads elements out into a new array or function call.
  // - For objects: It spreads key-value pairs into a new object.
  
  
    return this.products[index]; // Return the updated review
  }
  
  

    // public deleteproduct(id: string) {
    //   const product = this.products.find((p) => p.id === parseInt(id));
    //   if (!product)
    //     throw new NotFoundException(`product not found ${id}`, {
    //       description: 'the product does not deleted',
    //     });
  
    //   return { message: 'product was deleted' };
    // }


       public deleteproduct(id: number) {
      const product = this.products.find((p) => p.id );
      if (!product)
        throw new NotFoundException(`product not found ${id}`, {
          description: 'the product does not deleted',
        });
  
      return { message: 'product was deleted' };
    }

 }