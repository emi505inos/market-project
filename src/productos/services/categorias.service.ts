import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entities';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dto/categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria) private categRepo: Repository<Categoria>,
  ) {}
  findAll() {
    return this.categRepo.find({
      relations: ['productos'],
    });
  }
  async findOne(id: number) {
    const category = await this.categRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }
  async create(data: CreateCategoriaDTO) {
    const newCategory = this.categRepo.create(data);
    return this.categRepo.save(newCategory);
  }
  async update(id: number, changes: UpdateCategoriaDTO) {
    const category = await this.findOne(id);
    this.categRepo.merge(category, changes);
    return this.categRepo.save(category);
  }

  remove(id: number) {
    return this.categRepo.delete(id);
  }
}
