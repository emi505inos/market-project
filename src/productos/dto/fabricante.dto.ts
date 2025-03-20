import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateFabricanteDTO {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id: number;
  @IsString()
  @IsNotEmpty()
  nombre: string;
  @IsString()
  @IsNotEmpty()
  direccion: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsUrl()
  @IsNotEmpty()
  imagen: string;
}

export class UpdateFabricanteDTO extends PartialType(
  OmitType(CreateFabricanteDTO, ['id']),
) {}
