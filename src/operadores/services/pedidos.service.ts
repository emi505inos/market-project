import { Injectable } from '@nestjs/common';
import { Pedido } from '../entities/podido.entity';

@Injectable()
export class PedidosService {
  private pedido: Pedido[] = [];

  findAll() {
    return this.pedido;
  }
}
