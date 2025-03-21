import { Client } from 'pg';
// import { ConfigType } from '@nestjs/config';
import { CreateOperatorDTO, UpdateOperatorDTO } from '../dtos/operador.dto';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductosService } from 'src/productos/services/productos.service';
import { Repository } from 'typeorm';
// import config from 'src/config';
// import { Pedido } from '../entities/pedido.entities';
import { CompradoresService } from './compradores.service';
import { Operador } from '../entities/operador.entities';

@Injectable()
export class OperadoresService {
  constructor(
    private productsService: ProductosService,
    // @Inject(config.KEY) private configService: ConfigType<typeof config>,
    private compradorService: CompradoresService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(Operador) private operatorRepo: Repository<Operador>,
  ) {}

  async findAll() {
    return this.operatorRepo.find({
      relations: ['comprador'],
    });
  }
  async findOne(id: number) {
    const operador = await this.operatorRepo.findOne({
      where: { id },
      relations: ['comprador'],
    });
    if (!operador) {
      throw new NotFoundException(`Operador #${id} no encontrado`);
    }
    return operador;
  }
  async create(data: CreateOperatorDTO) {
    const newOperador = this.operatorRepo.create(data);
    if (data.compradorId) {
      const buyer = await this.compradorService.findOne(data.compradorId);
      newOperador.comprador = buyer;
    }
    return this.operatorRepo.save(newOperador);
  }
  async update(id: number, changes: UpdateOperatorDTO) {
    const operador = await this.findOne(id);
    const updOperador = this.operatorRepo.merge(operador, changes);
    return this.operatorRepo.save(updOperador);
  }

  remove(id: number) {
    return this.operatorRepo.delete(id);
  }

  // async getOrderByUser(id: number): Promise<Pedido> {
  //     const operador = await this.operatorRepo.findOne(id);
  //     return {
  //         date: new Date(),
  //         operador,
  //         producto: await this.productsService.findAll(),
  //     };
  // }
  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tareas', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }
}
