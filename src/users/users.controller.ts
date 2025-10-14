import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user.request.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() request: CreateUserRequestDto) {
    return this.usersService.createUser(request);
  }
}
