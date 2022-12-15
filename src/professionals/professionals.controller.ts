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
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Req } from 'src/dtos';
import { ProfessionalResDto } from 'src/dtos/res/professional-res.dto';
import { ProfessionalsService } from './professionals.service';

@UseGuards(JwtAuthGuard)
@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Get()
  public getProfessionals(
    @Query() professionalsFilterDto: Req.GetProfessionalsFilterDto,
  ): Promise<ProfessionalResDto[]> {
    return this.professionalsService.getProfessionals(professionalsFilterDto);
  }

  @Get(':id')
  public getProfessionalById(
    @Param('id') id: string,
  ): Promise<ProfessionalResDto> {
    return this.professionalsService.getProfessionalById(id);
  }

  @Post()
  public createProfessional(
    @Body() professional: Req.CreateProfessionalDto,
  ): Promise<ProfessionalResDto> {
    return this.professionalsService.createProfessional(professional);
  }

  @Put(':id')
  public updateProfessional(
    @Param('id') id: string,
    @Body() professional: Req.CreateProfessionalDto,
  ): Promise<ProfessionalResDto> {
    return this.professionalsService.updateProfessional(id, professional);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.professionalsService.deleteProfessional(id);
  }
}
