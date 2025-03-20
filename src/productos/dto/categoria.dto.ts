import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCategoriaDTO {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;
}

export class UpdateCategoriaDTO extends PartialType(
  OmitType(CreateCategoriaDTO, ['id']),
) {}
