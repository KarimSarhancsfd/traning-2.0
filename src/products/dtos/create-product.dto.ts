
import {IsString,IsNumber,IsNotEmpty,Min,MinLength,MaxLength, Length} from 'class-validator';

export class CreateProductDto {
    @IsString({message: 'Title must be a string'})
    @IsNotEmpty({message: 'Title is required'})
    // @MinLength(3,{message: 'Title must be at least 3 characters long'})
    // @MaxLength(100,{message: 'Title must not exceed 100 characters'})
    @Length(3, 100)
    title:string;


    @IsNumber()
    @IsNotEmpty()
    @Min(0,{message: 'Price must be greater than or equal to 0'})
    price:number;
}