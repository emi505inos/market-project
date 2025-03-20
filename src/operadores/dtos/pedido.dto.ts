import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsArray, IsDate, IsNotEmpty, IsPositive } from 'class-validator';

export class CreatePedidoDTO {
  @IsNotEmpty()
  @IsDate()
  readonly date: Date;

  @IsNotEmpty()
  @IsPositive()
  readonly compradorId: number;

  @IsNotEmpty()
  @IsArray()
  readonly productos: string[];
}

export class UpdatePedidoDTO extends PartialType(
  OmitType(CreatePedidoDTO, ['productos']),
) {}
