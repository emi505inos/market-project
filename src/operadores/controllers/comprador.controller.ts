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
import { CompradorService } from '../services/comprador.service';
import { ApiProperty } from '@nestjs/swagger';
import {
  CreateBuyerDTO,
  FilterBuyersDto,
  UpdateBuyerDTO,
} from '../dtos/comprador.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('comprador')
export class CompradorController {
  constructor(private buyersService: CompradorService) {}

  @Get(':buyerId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('buyerId') buyerId: string) {
    return this.buyersService.findOne(buyerId);
  }

  @Get()
  @ApiProperty({})
  getBuyers(@Query() params: FilterBuyersDto) {
    return this.buyersService.findAll(params);
  }
  @Post()
  create(@Body() payload: CreateBuyerDTO) {
    return this.buyersService.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateBuyerDTO,
  ) {
    return this.buyersService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.buyersService.remove(id);
  }
}
