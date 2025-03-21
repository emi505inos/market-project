import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateDetailOrderDto {
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly pedidoId: number;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly productoId: number;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly cantidad: number;
}
export class UpdateDetailOrderDto extends PartialType(CreateDetailOrderDto) {}
