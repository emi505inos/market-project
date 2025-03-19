import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosService } from './services/productos.service';
import { ProductosController } from './controllers/productos.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { CompradoresController } from './controllers/compradores.controller';
import { FabricantesController } from './controllers/fabricantes.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductosController,
    CategoriasController,
    CompradoresController,
    FabricantesController,
    OperadoresController,
    PedidosController,
  ],
  providers: [AppService, ProductosService],
})
export class AppModule {}
