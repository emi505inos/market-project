import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Fabricante } from '../entities/fabricante.entities';
import { Repository } from 'typeorm';

import {
  CreateManufacturersDTO,
  UpdateManufacturersDTO,
} from '../dto/fabricante.dto';
import { FabricanteService } from '../services/fabricante.service';

@ApiTags('Fabricantes')
@Controller('fabricantes')
export class FabricantesController {
  constructor(
    private manufacService: FabricanteService,
    @InjectRepository(Fabricante)
    private manufacRepo: Repository<Fabricante>,
  ) {}
  @ApiOperation({})
  @Get()
  getManufacturers() {
    return this.manufacService.findAll();
  }

  @ApiOperation({})
  @Get(':idFabricante')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('idFabricante', ParseIntPipe) idFabricante: string) {
    return this.manufacService.findOne(idFabricante);
  }
  @ApiOperation({})
  @Post()
  create(@Body() data: CreateManufacturersDTO) {
    const newManufacturers = this.manufacRepo.create(data);
    return this.manufacRepo.save(newManufacturers);
  }
  @ApiOperation({})
  @Put(':idFabricante')
  updateFabricante(
    @Param('idFabricante') idFabricante: string,
    @Body() paylord: UpdateManufacturersDTO,
  ): any {
    return this.manufacService.update(idFabricante, paylord);
  }
  @ApiOperation({})
  @Delete('idFabricante')
  deleteFabricante(@Param('idFabricante', ParseIntPipe) idFabricante: number) {
    return this.manufacService.remove(idFabricante.toString());
  }
}
