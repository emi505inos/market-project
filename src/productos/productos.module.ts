import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductosController } from './controllers/productos.controller';
import { ProductosService } from './services/productos.service';

import { FabricantesController } from './controllers/fabricantes.controller';
import { FabricantesService } from './services/fabricantes.service';

import { CategoriasController } from './controllers/categorias.controller';
import { CategoriasService } from './services/categorias.service';
import { ProductoController } from './controllers/producto.controller';
import { CategoriaController } from './controllers/categoria.controller';
import { FabricanteController } from './controllers/fabricante.controller';
import { FabricanteService } from './services/fabricante.service';
import { CategoriaService } from './services/categoria.service';
import { ProductoService } from './services/producto.service';
import { Producto } from './entities/producto.entities';
import { Fabricante } from './entities/fabricante.entities';
import { Categoria } from './entities/categoria.entities';
import { Productos, ProductSchema } from './entities/productos.entities';
import { Categorias, CategorySchema } from './entities/categorias.entities';
import {
  Fabricantes,
  ManufacturersSchema,
} from './entities/fabricantes.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Fabricante, Categoria]),
    MongooseModule.forFeature([
      {
        name: Productos.name,
        schema: ProductSchema,
      },
      {
        name: Categorias.name,
        schema: CategorySchema,
      },
      {
        name: Fabricantes.name,
        schema: ManufacturersSchema,
      },
    ]),
  ],
  controllers: [
    FabricantesController,
    CategoriasController,
    ProductosController,
    ProductoController,
    FabricanteController,
    CategoriaController,
  ],
  providers: [
    CategoriasService,
    FabricantesService,
    ProductosService,
    ProductoService,
    FabricanteService,
    CategoriaService,
  ],
  exports: [ProductosService, ProductoService],
})
export class ProductosModule {}
