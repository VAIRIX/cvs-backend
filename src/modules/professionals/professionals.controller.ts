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
import { ProfessionalsService } from './professionals.service';

@Controller('professionals')
@ApiBearerAuth()
@ApiTags('Professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.ProfessionalResDto, isArray: true })
  public getProfessionals(
    @Query() professionalsFilterDto: Req.GetProfessionalsFilterDto,
  ): Promise<Res.ProfessionalResDto[]> {
    return this.professionalsService.getProfessionals(professionalsFilterDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.ProfessionalResDto })
  public getProfessionalById(
    @Param('id') id: string,
  ): Promise<Res.ProfessionalResDto> {
    return this.professionalsService.getProfessionalById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: Res.ProfessionalResDto })
  public createProfessional(
    @Body() professional: Req.CreateProfessionalDto,
  ): Promise<Res.ProfessionalResDto> {
    return this.professionalsService.createProfessional(professional);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.ProfessionalResDto })
  public updateProfessional(
    @Param('id') id: string,
    @Body() professional: Req.CreateProfessionalDto,
  ): Promise<Res.ProfessionalResDto> {
    return this.professionalsService.updateProfessional(id, professional);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.professionalsService.deleteProfessional(id);
  }
}