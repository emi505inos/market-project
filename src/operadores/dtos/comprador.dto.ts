import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCompradorDTO {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id: number;
  @IsString()
  @IsNotEmpty()
  nombre: string;
  @IsString()
  @IsNotEmpty()
  apellido: string;
  @IsString()
  @IsNotEmpty()
  telefono: string;
}

export class UpdateCompradorDTO extends PartialType(
  OmitType(CreateCompradorDTO, ['id']),
) {}
