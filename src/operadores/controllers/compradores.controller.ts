import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateBuyerDTO, UpdateBuyerDTO } from '../dtos/comprador.dto';
import { CompradoresService } from '../services/compradores.service';

@ApiTags('Compradores')
@Controller('compradores')
export class CompradoresController {
  constructor(private buyersService: CompradoresService) {}
  @ApiOperation({})
  @Get(':idComprador')
  getComprador(@Param('idComprador') idComprador: string): string {
    return `El identidicador del comprador es ${idComprador}`;
  }
  @ApiOperation({})
  @Post()
  create(@Body() paylord: CreateBuyerDTO) {
    return this.buyersService.create(paylord);
  }
  @ApiOperation({})
  @Put('compradores/:idCompradores')
  updateCompradores(
    @Param('idCompradores') idCompradores: string,
    @Body() payload: UpdateBuyerDTO,
  ) {
    return this.buyersService.update(+idCompradores, payload);
  }
  @ApiOperation({})
  @Delete(':idCompradores')
  deleteCompradores(@Param('idComprador') idComprador: number): any {
    return {
      idComprador: idComprador,
      delete: true,
      count: 1,
    };
  }
}
