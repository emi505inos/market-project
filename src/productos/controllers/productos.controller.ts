import {
  Get,
  Param,
  // Post,
  // Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { ProductosService } from '../services/productos.service';
// import { CreateProductDTO, UpdateProductDTO } from '../dtos/productos.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Productos')
@Controller('productos')
export class ProductosController {
  constructor(private productsService: ProductosService) {}
  @ApiOperation({})
  @Get()
  getProducts() {
    return this.productsService.findAll();
  }
  @ApiOperation({})
  @Get(':idProduct')
  @HttpCode(HttpStatus.ACCEPTED) //Forma nest.js
  getProduct(@Param('idProduct', ParseIntPipe) idProduct: string) {
    return this.productsService.findOne(+idProduct);
  }
  // @Post() // Decorador para insertar registros
  // create(@Body() payload: CreateProductDTO) {
  //     return this.productsService.create(payload);
  // }
  // @ApiOperation({})
  // @Put(':idProduct')
  // updateProduct(
  //     @Param('idProduct') idProduct: string,
  //     @Body() payload: UpdateProductDTO,
  // ) {
  //     return this.productsService.update(+idProduct, payload);
  // }
  @ApiOperation({})
  @Put('id/categorias/:categoryId')
  addCategoryToProduct(
    @Param('id') id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryToProduct(id, categoryId);
  }
  @ApiOperation({})
  @Delete(':idProduct')
  deleteProduct(@Param('idProduct') idProduct: string) {
    return {
      message: 'Se ha borrado un Producto',
      idProduct: idProduct,
      delete: true,
      count: 1,
    };
  }
  @Delete(':id/categorias/:categoryId')
  removeCategoryByProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
