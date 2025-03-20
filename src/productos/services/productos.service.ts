import { Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from '../entities/producto.entity';
import { CreateProductDTO, UpdateProductDTO } from '../dto/producto.dto';

@Injectable()
export class ProductosService {
  private idCount = 0;
  private productos: Producto[] = [
    {
      id: 1,
      nombre: 'Producto 1',
      descripcion: 'Descripcion del producto 1',
      precio: 100,
      stock: 10,
      origen: 'Origen del producto 1',
      imagen: 'Imagen del producto 1',
    },
  ];
  findAll() {
    return this.productos;
  }
  findOne(id: number) {
    const product = this.productos.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }
  create(payload: CreateProductDTO) {
    this.idCount = this.idCount + 1;
    const newProduct = {
      id: this.idCount,
      ...payload,
    };
    this.productos.push(newProduct);
    return newProduct;
  }
  update(id: number, payload: UpdateProductDTO) {
    const product = this.findOne(id);
    if (product) {
      const index = this.productos.findIndex((item) => item.id === id);
      this.productos[index] = {
        ...product,
        ...payload,
      };
      return this.productos[index];
    }
    return null;
  }
  remove(id: number) {
    const index = this.productos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.productos.splice(index, 1);
    return { message: `Product with id ${id} removed` };
  }
}
