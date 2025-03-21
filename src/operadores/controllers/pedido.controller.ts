import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PedidoService } from '../services/pedido.service';
import {
  AddProductsToOrderDto,
  CreateOrderDto,
  UpdateOrderDto,
} from '../dtos/pedidos.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('pedido')
export class PedidoController {
  constructor(private ordersService: PedidoService) {}

  @Get(':orderId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('orderId') orderId: string) {
    return this.ordersService.findOne(orderId);
  }
  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }
  @Put(':id/')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, payload);
  }
  @Put(':id/productos')
  addProducts(@Param('id') id: string, @Body() payload: AddProductsToOrderDto) {
    return this.ordersService.addProductos(id, payload.productsIds);
  }
  @Delete()
  delete(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
  @Delete(':id/producto/:productId')
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.ordersService.removeProducto(id, productId);
  }
}
