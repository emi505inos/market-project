import { Controller, Get } from '@nestjs/common';
import { PedidosService } from '../services/pedidos.service';

@Controller('pedidos')
export class PedidosController {
  constructor(private pedidosService: PedidosService) {}
  @Get()
  getPedidos() {
    return this.pedidosService.findAll();
  }
}
