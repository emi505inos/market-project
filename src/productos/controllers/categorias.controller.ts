import {
  Controller,
  Get,
  Param,
  Put,
  Post,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriasService } from '../services/categorias.service';
import { CreateCategoriaDTO, UpdateCategoriaDTO } from '../dto/categoria.dto';

@ApiTags('Categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private categoriesService: CategoriasService) {}
  @Get()
  getCategories() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({})
  @Get(':idCategorias')
  @HttpCode(HttpStatus.ACCEPTED)
  getCategory(@Param('idCategorias') idCategorias: string) {
    return this.categoriesService.findOne(+idCategorias);
  }
  @ApiOperation({})
  @Post()
  create(@Body() payload: CreateCategoriaDTO) {
    return this.categoriesService.create(payload);
  }
  @ApiOperation({})
  @Put(':idCategorias')
  updateCategoria(
    @Param('idCategorias') idCategoria: string,
    @Body() data: UpdateCategoriaDTO,
  ) {
    return this.categoriesService.update(+idCategoria, data);
  }
  @ApiOperation({})
  @Delete(':idCategorias')
  deleteCategorias(@Param('idCategorias') idCategorias: string) {
    return {
      message: 'Se ha Borrado una Categoria.',
      idCategorias: idCategorias,
      delete: true,
      count: 1,
    };
  }
}
