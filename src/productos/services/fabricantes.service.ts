import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Fabricante } from '../entities/fabricante.entities';
import { Repository } from 'typeorm';
import {
  CreateManufacturersDTO,
  UpdateManufacturersDTO,
} from '../dto/fabricante.dto';

@Injectable()
export class FabricantesService {
  constructor(
    @InjectRepository(Fabricante) private fabRepo: Repository<Fabricante>,
  ) {}

  findAll(): Promise<Fabricante[]> {
    return this.fabRepo.find({
      relations: ['products'],
    });
  }

  async findOne(id: number): Promise<Fabricante> {
    const fabricante = await this.fabRepo.findOne({
      where: { id },
    });
    if (!fabricante) {
      throw new NotFoundException(`El fabricante #${id} no existe`);
    }
    return fabricante;
  }

  create(data: CreateManufacturersDTO): Promise<Fabricante> {
    const newFab = this.fabRepo.create(data);
    return this.fabRepo.save(newFab);
  }

  async update(
    id: number,
    changes: UpdateManufacturersDTO,
  ): Promise<Fabricante> {
    const fabricante = await this.fabRepo.findOne({
      where: { id }, // Ajuste similar al método "findOne".
    });
    if (!fabricante) {
      throw new NotFoundException(`El fabricante #${id} no existe`);
    }
    this.fabRepo.merge(fabricante, changes);
    return this.fabRepo.save(fabricante);
  }

  async remove(id: number): Promise<void> {
    const result = await this.fabRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`El fabricante #${id} no existe`);
    }
  }
}
