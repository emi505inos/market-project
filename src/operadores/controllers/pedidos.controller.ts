import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/pedidos.dto';
import { PedidosService } from '../services/pedidos.service';
@Controller('pedidos')
export class PedidosController {
  constructor(private pedidosService: PedidosService) {}
  @Get()
  findAll() {
    return this.pedidosService.findAll();
  }
  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.findOne(id);
  }
  @Post()
  create(@Body() paylord: CreateOrderDto) {
    return this.pedidosService.create(paylord);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() paylord: UpdateOrderDto,
  ) {
    return this.pedidosService.update(id, paylord);
  }
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pedidosService.remove(id);
  }
}
