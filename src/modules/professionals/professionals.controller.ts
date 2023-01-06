import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Req, Res } from 'src/dtos';
import { ApiPaginatedResponse } from 'src/utils/api-paginated-response';
import { ProfessionalsService } from './professionals.service';

@Controller('professionals')
@ApiBearerAuth()
@ApiTags('Professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(Res.ProfessionalResDto)
  @ApiExtraModels(Res.PaginatedListDto)
  public getProfessionals(
    @Query() professionalsFilterDto: Req.GetProfessionalsFilterDto,
  ): Promise<Res.PaginatedListDto<Res.ProfessionalResDto>> {
    return this.professionalsService.getProfessionals(professionalsFilterDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.ProfessionalResDto })
  public getProfessionalById(
    @Param('id', new ParseUUIDPipe()) id: string,
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('id') id: string): Promise<void> {
    return this.professionalsService.deleteProfessional(id);
  }
}
