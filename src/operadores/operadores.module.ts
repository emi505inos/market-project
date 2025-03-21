import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from 'src/productos/productos.module';
import { PedidosService } from './services/pedidos.service';
import { PedidosController } from './controllers/pedidos.controller';
import { OperadoresService } from './services/operadores.service';
import { OperadoresController } from './controllers/operadores.controller';
import { Module } from '@nestjs/common';
import { DetallePedidoService } from './services/detalle-pedido.service';
import { DetallePedidoController } from './controllers/detalle-pedido.controller';
import { CompradoresService } from './services/compradores.service';
import { CompradoresController } from './controllers/compradores.controller';
import { CompradorController } from './controllers/comprador.controller';
import { CompradorService } from './services/comprador.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PedidoService } from './services/pedido.service';
import { PedidoController } from './controllers/pedido.controller';
import { OperadorController } from './controllers/operador.controller';
import { OperadorService } from './services/operador.service';
import { Operador } from './entities/operador.entities';
import { Comprador } from './entities/comprador.entities';
import { Pedido } from './entities/pedidos.entities';
import { DetallePedido } from './entities/detallePedido.entities';
import { Producto } from 'src/productos/entities/producto.entities';
import { Operadores, OperadoresSchema } from './entities/operadores.entities';
import { Compradores, BuyersSchema } from './entities/compradores.entities';
import { Pedidos, OrderSchema } from './entities/podido.entities';

@Module({
  imports: [
    ProductosModule,
    TypeOrmModule.forFeature([
      Operador,
      Comprador,
      Pedido,
      DetallePedido,
      Producto,
    ]),
    ProductosModule,
    MongooseModule.forFeature([
      {
        name: Pedidos.name,
        schema: OrderSchema,
      },
      {
        name: Compradores.name,
        schema: BuyersSchema,
      },
      {
        name: Operadores.name,
        schema: OperadoresSchema,
      },
    ]),
  ],
  controllers: [
    OperadoresController,
    CompradoresController,
    PedidosController,
    DetallePedidoController,
    CompradorController,
    PedidoController,
    OperadorController,
  ],
  providers: [
    OperadoresService,
    CompradoresService,
    PedidosService,
    DetallePedidoService,
    CompradorService,
    PedidoService,
    OperadorService,
  ],
  exports: [OperadorService],
})
export class OperadoresModule {}
