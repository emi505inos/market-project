import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';

@Controller('operadores')
export class OperadoresController {
  constructor(private operadoresService: OperadoresService) {}

  @Get(':id/pedidos')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operadoresService.getOrderByUser(id);
  }
  @Post()
  create(@Body() payload: any) {
    return this.operadoresService.create(payload);
  }
  @Put(':idProduct')
  update(@Param('idProduct') idProduct: string, @Body() payload: any) {
    return this.operadoresService.update(+idProduct, payload);
  }
}
