import {
  Controller,
  Get,
  Param,
  Put,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { OperadoresService } from '../services/operadores.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateOperatorDTO, UpdateOperatorDTO } from '../dtos/operador.dto';
@ApiTags('Operadores')
@Controller('operadores')
export class OperadoresController {
  constructor(private operadorService: OperadoresService) {}
  // @Get(':idOperador/pedidos')
  // getOperador(@Param('idOperador', ParseIntPipe) idOperador: number) {
  //     return this.operadorService.findAll(idOperador);
  // }
  @Get()
  getOperators() {
    return this.operadorService.findAll();
  }
  @Post()
  create(@Body() paylord: CreateOperatorDTO) {
    return this.operadorService.create(paylord);
  }
  @Put('operadores/:idOperador')
  updateOperadores(
    @Param('idOperador') idOperador: string,
    @Body() payload: UpdateOperatorDTO,
  ) {
    return this.operadorService.update(+idOperador, payload);
  }
  @Delete(':idOperador')
  deleteOperador(@Param('idOperador') idOperador: number): any {
    return {
      idOperador: idOperador,
      delete: true,
      count: 1,
    };
  }
  @Get('tasks')
  getTasks() {
    return this.operadorService.getTasks();
  }
}
