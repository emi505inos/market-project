import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from '../entities/pedidos.entities';
import { Comprador } from '../entities/comprador.entities';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/pedidos.dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private orderRepo: Repository<Pedido>,
    @InjectRepository(Comprador) private buyerRepo: Repository<Comprador>,
  ) {}

  async findAll() {
    return this.orderRepo.find(); // No es necesario "await" aquí, ya que el método devuelve una Promesa.
  }

  async findOne(id: number) {
    const pedido = await this.orderRepo.findOne({
      where: { id },
      relations: ['detalles', 'detalles.producto'],
    });
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return pedido;
  }

  async create(data: CreateOrderDto) {
    const pedido = new Pedido();

    if (data.compradorId) {
      const customer = await this.buyerRepo.findOne({
        where: { id: data.compradorId },
      });
      if (!customer) {
        throw new NotFoundException(
          `Comprador con ID ${data.compradorId} no encontrado`,
        );
      }
      pedido.comprador = customer; // Asignación segura.
    }

    return this.orderRepo.save(pedido); // Guarda solo si el pedido es válido.
  }

  async update(id: number, changes: UpdateOrderDto) {
    const pedido = await this.orderRepo.findOne({ where: { id } });

    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }

    if (changes.compradorId) {
      const customer = await this.buyerRepo.findOne({
        where: { id: changes.compradorId },
      });
      if (!customer) {
        throw new NotFoundException(
          `Comprador con ID ${changes.compradorId} no encontrado`,
        );
      }
      pedido.comprador = customer; // Asignación segura.
    }

    Object.assign(pedido, changes); // Aplicar otros cambios.
    return this.orderRepo.save(pedido); // Guardar los cambios.
  }

  async remove(id: number) {
    const result = await this.orderRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return { message: 'Pedido eliminado exitosamente' };
  }
}
