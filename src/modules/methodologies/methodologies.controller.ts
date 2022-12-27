import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Req, Res } from 'src/dtos';
import { MethodologiesService } from './methodologies.service';

@Controller('methodologies')
@ApiBearerAuth()
@ApiTags('Methodologies')
export class MethodologiesController {
  constructor(private readonly methodologiesService: MethodologiesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.MethodologyResDto, isArray: true })
  public getMethodologies(
    @Query() methodologiesFilterDto: Req.GetMethodologiesFilterDto,
  ): Promise<Res.MethodologyResDto[]> {
    return this.methodologiesService.getMethodologies(methodologiesFilterDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.MethodologyResDto })
  public getMethodologyById(
    @Param('id') id: string,
  ): Promise<Res.MethodologyResDto> {
    return this.methodologiesService.getMethodologyById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: Res.MethodologyResDto })
  public createMethodology(
    @Body() methodology: Req.CreateMethodologyDto,
  ): Promise<Res.MethodologyResDto> {
    return this.methodologiesService.createMethodology(methodology);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.MethodologyResDto })
  public updateMethodology(
    @Param('id') id: string,
    @Body() methodology: Req.CreateMethodologyDto,
  ): Promise<Res.MethodologyResDto> {
    return this.methodologiesService.updateMethodology(id, methodology);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.methodologiesService.deleteMethodology(id);
  }
}
