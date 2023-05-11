import { Body, Controller, Delete, Get, Param, Post, Patch, Query, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {

  constructor(private usersService: UsersService){}

  @Post('signup')
  createUser(@Body() body: CreateUserDto){
    return this.usersService.create(body.email, body.password); 
  }

  @Get('/:id')
  findUser(@Param('id') id: string){
    const user = this.usersService.findOne(+id);
    if(!user) {
      throw new NotFoundException('user not found!');
    }
    return user;
  }

  @Get()
  findAllUser(@Query('email') email: string){
    return this.usersService.find(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto){
    return this.usersService.update( +id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
