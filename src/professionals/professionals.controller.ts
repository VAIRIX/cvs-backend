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
import { ProfessionalsService } from './professionals.service';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  public getMany(): Promise<any> {
    return this.professionalsService.getMany();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public getOne(@Param('id') id: number): Promise<any> {
    return this.professionalsService.getOne(Number(id));
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() user: any): Promise<any> {
    return this.professionalsService.create(user);
  }

  @Post(':id')
  @HttpCode(HttpStatus.OK)
  public update(@Body() user: any): Promise<any> {
    return this.professionalsService.update(user.id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  public delete(@Param('id') id: number): Promise<any> {
    return this.professionalsService.delete(Number(id));
  }
}
