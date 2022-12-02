import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public getMany(): Promise<any> {
    return this.usersService.getMany();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public getOne(@Param('id') id: number): Promise<any> {
    return this.usersService.getOne(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() user: any): Promise<any> {
    return this.usersService.create(user);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  public update(@Body() user: any): Promise<any> {
    return this.usersService.update(user.id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public delete(@Param('id') id: number): Promise<any> {
    return this.usersService.delete(Number(id));
  }
}
