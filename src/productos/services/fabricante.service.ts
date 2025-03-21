import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Fabricantes } from '../entities/fabricantes.entities';
import { Model } from 'mongoose';
import {
  CreateManufacturersDTO,
  UpdateManufacturersDTO,
} from '../dto/fabricante.dto';

@Injectable()
export class FabricanteService {
  constructor(
    @InjectModel(Fabricantes.name) private manufaModel: Model<Fabricantes>,
  ) {}
  findAll() {
    return this.manufaModel.find().exec();
  }
  async findOne(id: string) {
    const manufa = await this.manufaModel.findById(id).exec();
    if (!manufa) {
      throw new NotFoundException(`Manufacturer #${id} not found`);
    }
    return manufa;
  }
  create(data: CreateManufacturersDTO) {
    const newManufacturer = new this.manufaModel(data);
    return newManufacturer.save();
  }
  async update(id: string, changes: UpdateManufacturersDTO) {
    const manufa = await this.manufaModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!manufa) {
      throw new NotFoundException('Manufacturer not found');
    }
    return manufa;
  }
  remove(id: string) {
    return this.manufaModel.findByIdAndDelete(id);
  }
}
