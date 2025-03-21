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
import { CategoriaService } from '../services/categoria.service';
import { ApiOperation } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dto/categoria.dto';

@Controller('categoria')
export class CategoriaController {
  constructor(private categoryService: CategoriaService) {}

  @ApiOperation({ summary: 'Obtener un Producto' })
  @Get(':categoryId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('categoryId') categoryId: string) {
    return this.categoryService.findOne(categoryId);
  }
  @ApiOperation({ summary: 'Crear un Producto' })
  @Post()
  create(@Body() payload: CreateCategoriaDTO) {
    return this.categoryService.create(payload);
  }
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCategoriaDTO,
  ) {
    return this.categoryService.update(id, payload);
  }
  @Delete()
  delete(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
