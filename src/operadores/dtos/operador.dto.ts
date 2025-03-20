import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOperadorDTO {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  id: number;
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  role: string;
}

export class UpdateOperadorDTO extends PartialType(
  OmitType(CreateOperadorDTO, ['id']),
) {}
