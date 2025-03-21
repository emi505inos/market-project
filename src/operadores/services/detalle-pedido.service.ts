import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedidos.entities';
import { DetallePedido } from '../entities/detallePedido.entities';
import { Producto } from 'src/productos/entities/producto.entities';
import { CreateDetailOrderDto } from '../dtos/detalle-pedido';

@Injectable()
export class DetallePedidoService {
  constructor(
    @InjectRepository(Pedido) private orderRepo: Repository<Pedido>,
    @InjectRepository(DetallePedido)
    private detailRepo: Repository<DetallePedido>,
    @InjectRepository(Producto) private productRepo: Repository<Producto>,
  ) {}
  async create(data: CreateDetailOrderDto) {
    const pedido = await this.orderRepo.findOneBy({ id: data.pedidoId });
    if (!pedido) {
      throw new Error(`Pedido with id ${data.pedidoId} not found`);
    }
    const producto = await this.productRepo.findOneBy({ id: data.productoId });
    if (!producto) {
      throw new Error(`Producto with id ${data.productoId} not found`);
    }
    const detalle = new DetallePedido();
    detalle.pedido = pedido;
    detalle.producto = producto;
    detalle.cantidad = data.cantidad;
    return this.detailRepo.save(detalle);
  }
}
