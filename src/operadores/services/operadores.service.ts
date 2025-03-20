import { Injectable, NotFoundException } from '@nestjs/common';
import { Operador } from '../entities/operador.entity';
import { Pedido } from '../entities/podido.entity';
import { ProductosService } from 'src/productos/services/productos.service';
import { CreateOperadorDTO, UpdateOperadorDTO } from '../dtos/operador.dto';

@Injectable()
export class OperadoresService {
  private idCount = 0;
  private operador: Operador[] = [
    {
      id: 1,
      email: 'pedro@mail.com',
      password: 'pedro1',
      role: 'admin',
    },
  ];
  constructor(private productsService: ProductosService) {}

  findAll() {
    return this.operador;
  }
  findOne(id: number) {
    const operator = this.operador.find((item) => item.id === id);
    if (!operator) {
      throw new NotFoundException(`Operator with id ${id} not found`);
    }
    return operator;
  }

  getOrderByUser(id: number): Pedido {
    const operador = this.findOne(id);
    return {
      date: new Date(),
      operador,
      products: this.productsService.findAll(),
    };
  }
  create(payload: CreateOperadorDTO) {
    this.idCount = this.idCount + 1;
    const newOperator: Operador = {
      id: this.idCount,
      email: payload.email,
      password: payload.password,
      role: payload.role,
    };
    this.operador.push(newOperator);
    return newOperator;
  }
  update(id: number, payload: UpdateOperadorDTO) {
    const product = this.findOne(id);
    if (product) {
      const index = this.operador.findIndex((item) => item.id === id);
      this.operador[index] = {
        ...product,
        ...payload,
      };
      return this.operador[index];
    }
    return null;
  }
  remove(id: number) {
    const index = this.operador.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Operator with id ${id} not found`);
    }
    this.operador.splice(index, 1);
    return { message: `Operator with id ${id} removed` };
  }
}
