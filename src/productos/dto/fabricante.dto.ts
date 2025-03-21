import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  // IsNumber,
  // IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateManufacturersDTO {
  // @ApiProperty({ description: 'Id del Fabricante' })
  // @IsNumber()
  // @IsNotEmpty()
  // @IsPositive()
  // readonly id: number;

  @ApiProperty({ description: 'Nombre del Fabricante' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({ description: 'Direccion del Fabricante' })
  @IsString()
  @IsNotEmpty()
  readonly direccion: string;

  @ApiProperty({ description: 'Email del Fabricante' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Imagen del Fabricante' })
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;
}
export class UpdateManufacturersDTO extends PartialType(
  OmitType(CreateManufacturersDTO, ['nombre']),
) {}
