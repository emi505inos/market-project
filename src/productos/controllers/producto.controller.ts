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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductoService } from '../services/producto.service';

import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import {
  CreateProductDTO,
  FilterProductsDto,
  UpdateProductDTO,
} from '../dto/producto.dto';
import { JwtAuthGuard } from 'src/auth/guards/jtw-auth.guard';
import { Role } from 'src/auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Producto')
@Controller('producto')
export class ProductoController {
  constructor(private productService: ProductoService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener Productos' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productService.findAll(params);
  }
  @ApiOperation({ summary: 'Obtener un Producto' })
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId') productId: string) {
    return this.productService.findOne(productId);
  }
  @ApiOperation({ summary: 'Crear un Producto' })
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDTO) {
    return this.productService.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDTO,
  ) {
    return this.productService.update(id, payload);
  }
  @Delete()
  delete(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
