import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateBuyerDTO {
  @ApiProperty({ description: 'Id del Comprador' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly id: number;

  @ApiProperty({ description: 'Nombre del Comprador' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Apellido del Comprador' })
  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @ApiProperty({ description: 'Telefono del Comprador' })
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsArray()
  @IsNotEmpty()
  readonly direcciones: any;
}
export class UpdateBuyerDTO extends PartialType(
  OmitType(CreateBuyerDTO, ['id']),
) {}

export class FilterBuyersDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsArray()
  @IsNotEmpty()
  readonly direcciones: any;
}
