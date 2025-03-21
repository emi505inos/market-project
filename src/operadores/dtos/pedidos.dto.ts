import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly compradorId: number;

  @IsArray()
  @IsNotEmpty()
  readonly productos: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['productos']),
) {}

export class AddProductsToOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}
