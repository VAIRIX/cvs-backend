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
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Req, Res } from 'src/dtos';
import { AttributesService } from './attributes.service';

@Controller('attributes')
@ApiBearerAuth()
@ApiTags('Attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.AttributeResDto, isArray: true })
  public getAttributes(
    @Query() attributesFilterDto: Req.GetAttributesFilterDto,
  ): Promise<Res.AttributeResDto[]> {
    return this.attributesService.getAttributes(attributesFilterDto);
  }

  @Get('/types')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.AttributeResDto, isArray: true })
  public getAttributeTypes(): Promise<Res.AttributeTypeResDto[]> {
    return this.attributesService.getAttributeTypes();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.AttributeResDto })
  public getAttributeById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Res.AttributeResDto> {
    return this.attributesService.getAttributeById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: Res.AttributeResDto })
  public createAttribute(
    @Body() attribute: Req.CreateAttributeDto,
  ): Promise<Res.AttributeResDto> {
    return this.attributesService.createAttribute(attribute);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: Res.AttributeResDto })
  public updateAttribute(
    @Param('id') id: string,
    @Body() attribute: Req.CreateAttributeDto,
  ): Promise<Res.AttributeResDto> {
    return this.attributesService.updateAttribute(id, attribute);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  public delete(@Param('id') id: string): Promise<void> {
    return this.attributesService.deleteAttribute(id);
  }
}
