import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  // Query,
} from '@nestjs/common';
import { ProductosService } from '../services/productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private productsSercvice: ProductosService) {}

  @Get(':idProduct')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('idProduct', ParseIntPipe) idProduct: string) {
    return this.productsSercvice.findOne(+idProduct);
  }
  @Post()
  create(@Body() payload: any) {
    return this.productsSercvice.create(payload);
  }
  @Put(':idProduct')
  update(@Param('idProduct') idProduct: string, @Body() payload: any) {
    return this.productsSercvice.update(+idProduct, payload);
  }
}
