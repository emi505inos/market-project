import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOperatorDTO, UpdateOperatorDTO } from '../dtos/operador.dto';
import * as bcrypt from 'bcrypt';
import { Operadores } from '../entities/operadores.entities';

@Injectable()
export class OperadorService {
  constructor(
    @InjectModel(Operadores.name) private operatorModel: Model<Operadores>,
  ) {}
  findAll() {
    return this.operatorModel.find().exec();
  }
  async findOne(id: string) {
    const operator = await this.operatorModel.findById(id).exec();
    if (!operator) {
      throw new NotFoundException(`Operator #${id} not found`);
    }
    return operator;
  }
  async create(data: CreateOperatorDTO) {
    const newModel = new this.operatorModel(data);
    const hashPassword = await bcrypt.hash(newModel.password, 10);
    newModel.password = hashPassword;
    const model = await newModel.save();
    const { ...rta } = model.toJSON();
    return rta;
  }

  async update(id: string, changes: UpdateOperatorDTO) {
    const operator = await this.operatorModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!operator) {
      throw new NotFoundException(`Operator #${id} not found`);
    }
    return operator;
  }
  remove(id: string) {
    return this.operatorModel.findByIdAndDelete(id);
  }

  findByEmail(email: string) {
    return this.operatorModel.findOne({ email }).exec();
  }
}
