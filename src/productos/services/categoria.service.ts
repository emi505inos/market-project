import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categorias } from '../entities/categorias.entities';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dto/categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectModel(Categorias.name) private categoryModel: Model<Categorias>,
  ) {}
  findAll() {
    return this.categoryModel.find().exec();
  }
  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Manufacturer #${id} not found`);
    }
    return category;
  }
  create(data: CreateCategoriaDTO) {
    const newCategory = new this.categoryModel(data);
    return newCategory.save();
  }
  async update(id: string, changes: UpdateCategoriaDTO) {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException('Manufacturer not found');
    }
    return category;
  }
  remove(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
