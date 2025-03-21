import {
  Body,
  Controller,
  Get,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FabricanteService } from '../services/fabricante.service';
import { ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  CreateManufacturersDTO,
  UpdateManufacturersDTO,
} from '../dto/fabricante.dto';

@Controller('fabricante')
export class FabricanteController {
  constructor(private manufaService: FabricanteService) {}

  @ApiOperation({ summary: 'Obtener un Producto' })
  @Get(':manufacturerId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('manufacturerId') manufaId: string) {
    return this.manufaService.findOne(manufaId);
  }
  @ApiOperation({ summary: 'Crear un Producto' })
  @Post()
  create(@Body() payload: CreateManufacturersDTO) {
    return this.manufaService.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateManufacturersDTO,
  ) {
    return this.manufaService.update(id, payload);
  }
  @Delete()
  delete(@Param('id') id: string) {
    return this.manufaService.remove(id);
  }
}
