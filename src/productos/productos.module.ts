import { forwardRef, Module } from '@nestjs/common';
import { ProductosController } from './controllers/productos.controller';
import { CategoriasController } from './controllers/categorias.controller';
import { FabricantesController } from './controllers/fabricantes.controller';
import { CategoriaService } from './services/categoria.service';
import { FabricanteService } from './services/fabricante.service';
import { ProductosService } from './services/productos.service';
import { OperadoresModule } from 'src/operadores/operadores.module';

@Module({
  imports: [forwardRef(() => OperadoresModule)],
  controllers: [
    ProductosController,
    CategoriasController,
    FabricantesController,
  ],
  providers: [CategoriaService, FabricanteService, ProductosService],
  exports: [ProductosService],
})
export class ProductosModule {}
