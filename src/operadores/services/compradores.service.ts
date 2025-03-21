import { CreateBuyerDTO, UpdateBuyerDTO } from '../dtos/comprador.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comprador } from '../entities/comprador.entities';

@Injectable()
export class CompradoresService {
  constructor(
    @InjectRepository(Comprador) private buyerRepo: Repository<Comprador>,
  ) {}

  async findAll() {
    return await this.buyerRepo.find();
  }
  async findOne(id: number) {
    const comprador = await this.buyerRepo.findOneBy({ id });
    if (!comprador) {
      throw new NotFoundException(`Comprador #${id} no encontrado`);
    }
    return comprador;
  }
  create(data: CreateBuyerDTO) {
    const newBuyer = this.buyerRepo.create(data);
    return this.buyerRepo.save(newBuyer);
  }
  async update(id: number, changes: UpdateBuyerDTO) {
    const buyer = await this.findOne(id);
    this.buyerRepo.merge(buyer, changes);
    return this.buyerRepo.save(buyer);
  }
  remove(id: number) {
    return this.buyerRepo.delete(id);
  }
}
