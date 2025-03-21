import { Body, Controller, Post } from '@nestjs/common';
import { DetallePedidoService } from '../services/detalle-pedido.service';
import { CreateDetailOrderDto } from '../dtos/detalle-pedido';

@Controller('detalle-pedido')
export class DetallePedidoController {
  constructor(private detailService: DetallePedidoService) {}
  @Post()
  create(@Body() paylord: CreateDetailOrderDto) {
    return this.detailService.create(paylord);
  }
}
