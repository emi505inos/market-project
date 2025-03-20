import { forwardRef, Module } from '@nestjs/common';
import { CompradoresController } from './controllers/compradores.controller';
import { OperadoresController } from './controllers/operadores.controller';
import { PedidosController } from './controllers/pedidos.controller';
import { CompradoresService } from './services/compradores.service';
import { OperadoresService } from './services/operadores.service';
import { PedidosService } from './services/pedidos.service';
import { ProductosModule } from 'src/productos/productos.module';

@Module({
  imports: [forwardRef(() => ProductosModule)],
  controllers: [CompradoresController, OperadoresController, PedidosController],
  providers: [CompradoresService, OperadoresService, PedidosService],
  exports: [OperadoresService],
})
export class OperadoresModule {}
