import { Module,Get, Controller,Post,Put,Delete, NotFoundException, Param, Body, ParseIntPipe, BadRequestException,ValidationPipe } from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';

import {UpdateUserDto } from './dtos/update-user.dto'




type User = {
    id:number;
    name: string ;
    email: string ;
}

@Controller("/api/users")
export class UsersController {
    // GET: http://localhost:5000/api/users
   // GET: ~/api/users
   private user:User[] = [
    { id: 1, name: 'Alice', email: 'kariminstructor@gmail.com' },
{ id: 2, name: 'Bob', email: 'bobstudent@gmail.com' },
{ id: 3, name: 'Charlie', email: 'charlieinstructor@gmail.com' },
   ]


   
    @Get()
    public getAllUsers() {
        return  this.user.map(user =>{
            const role = this.getRoleFromEmail(user.email)
            return { ...user, role};})
        
    }

    @Post()
    createUser(@Body(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true})) body : CreateUserDto){
        
        const newUser:User = {
            id:this.user.length +1,
            // name: body.name,
            // email: body.email
            ...body
        };
        this.user.push(newUser);
        const role = this.getRoleFromEmail(newUser.email)
        return { ...newUser, role};

    }

    @Get('/:id')
    public GetSpecficUser(@Param('id', ParseIntPipe) id:number){
        const user = this.user.find(u => u.id === id );
        if(!user){
            throw new NotFoundException(`User with id ${id} not found`)
        }
        return user;
    }


     @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    const user = this.user.find(u => u.id === id);
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, body);

    const role = this.getRoleFromEmail(user.email);
    return { ...user, role };
  }

  @Delete(":id")
  DeleteUser(@Param('id', ParseIntPipe) id:number){
    const user = this.user.find(u => u.id)
 
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user
    
  }

  private getRoleFromEmail(email: string): 'instructor' | 'student' {
   if(email.includes('instructor')){
    return 'instructor'
   }else if (email.includes('student')){
    return 'student'
   }else {
    throw new BadRequestException('Email must include role: "instructor" or "student"')
   }
  }



   
}



