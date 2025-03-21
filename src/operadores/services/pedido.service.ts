import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedidos } from '../entities/podido.entities';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/pedidos.dto';
@Injectable()
export class PedidoService {
  constructor(@InjectModel(Pedidos.name) private orderModel: Model<Pedidos>) {}
  findAll() {
    return this.orderModel
      .find()
      .populate('comprador')
      .populate({
        path: 'productos',
        model: 'Productos',
      })
      .exec();
  }
  async findOne(id: string) {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }
  create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  async update(id: string, changes: UpdateOrderDto) {
    const order = await this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }
  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id);
  }
  async removeProducto(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    order.productos.pull(productId);
    return order.save();
  }
  async addProductos(id: string, productsIds: string[]) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    productsIds.forEach((pId) => order.productos.push(pId));
    return order.save();
  }
}
