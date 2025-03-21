import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entities';
import { Categoria } from '../entities/categoria.entities';
import { Fabricante } from '../entities/fabricante.entities';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto) private productRepo: Repository<Producto>,
    @InjectRepository(Categoria) private categRepo: Repository<Categoria>,
    @InjectRepository(Fabricante) private fabRepo: Repository<Fabricante>,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['fabricante', 'categorias'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['fabricante', 'categorias'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  remove(id: number) {
    this.productRepo.delete(id);
    return { message: `Producto Id nº ${id} ha sido eliminado.` };
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const producto = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categorias'],
    });
    if (!producto) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    producto.categorias = producto.categorias.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(producto);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const producto = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categorias'],
    });

    const category = await this.categRepo.findOne({
      where: { id: categoryId },
    });

    if (!producto) {
      throw new NotFoundException(`Product #${productId} not found`);
    }
    if (!category) {
      throw new NotFoundException(`Category #${categoryId} not found`);
    }

    producto.categorias.push(category);
    return this.productRepo.save(producto);
  }
}
