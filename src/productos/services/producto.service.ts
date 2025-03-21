import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  FilterProductsDto,
  CreateProductDTO,
  UpdateProductDTO,
} from '../dto/producto.dto';
import { Productos } from '../entities/productos.entities';

@Injectable()
export class ProductoService {
  constructor(
    @InjectModel(Productos.name) private productModel: Model<Productos>,
  ) {}
  findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Productos> = {};
      const { limit, offset } = params;
      const { precioMinimo, precioMaximo } = params;
      if (precioMinimo && precioMaximo) {
        filters.precio = { $gte: precioMinimo, $lte: precioMaximo };
      }
      return this.productModel
        .find(filters)
        .populate('fabricante')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return this.productModel.find().populate('fabricante').exec();
  }
  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
  create(data: CreateProductDTO) {
    const newProduct = new this.productModel(data);
    return newProduct.save();
  }
  async update(id: string, changes: UpdateProductDTO) {
    const product = await this.productModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
