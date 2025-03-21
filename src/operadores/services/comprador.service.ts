import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  CreateBuyerDTO,
  FilterBuyersDto,
  UpdateBuyerDTO,
} from '../dtos/comprador.dto';
import { Compradores } from '../entities/compradores.entities';

@Injectable()
export class CompradorService {
  constructor(
    @InjectModel(Compradores.name) private buyersModel: Model<Compradores>,
  ) {}
  findAll(params?: FilterBuyersDto) {
    if (params) {
      const filters: FilterQuery<Compradores> = {};
      const { limit, offset } = params;
      if (Array.isArray(params.direcciones)) {
        filters.direcciones = { direcciones: params.direcciones };
      }
      return this.buyersModel
        .find()
        .populate('direcciones')
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return this.buyersModel.find().populate('direcciones').exec();
  }

  async findOne(id: string) {
    const buyer = await this.buyersModel.findById(id).exec();
    if (!buyer) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return buyer;
  }
  create(data: CreateBuyerDTO) {
    const newBuyer = new this.buyersModel(data);
    return newBuyer.save();
  }

  async update(id: string, changes: UpdateBuyerDTO) {
    const buyer = await this.buyersModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!buyer) {
      throw new NotFoundException(`Buyer #${id} not found`);
    }
    return buyer;
  }

  remove(id: string) {
    return this.buyersModel.findByIdAndDelete(id);
  }
}
