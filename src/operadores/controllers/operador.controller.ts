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
import { OperadorService } from '../services/operador.service';
import { CreateOperatorDTO, UpdateOperatorDTO } from '../dtos/operador.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@Controller('operador')
export class OperadorController {
  constructor(private operatorService: OperadorService) {}

  @Get(':operatorId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('operatorId') operatorId: string) {
    return this.operatorService.findOne(operatorId);
  }

  @Post()
  create(@Body() payload: CreateOperatorDTO) {
    return this.operatorService.create(payload);
  }
  @Put(':id/')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOperatorDTO,
  ) {
    return this.operatorService.update(id, payload);
  }
  @Delete()
  delete(@Param('id') id: string) {
    return this.operatorService.remove(id);
  }
}
