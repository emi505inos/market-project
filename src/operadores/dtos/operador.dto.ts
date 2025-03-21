import {
  IsNotEmpty,
  IsString,
  // IsNumber,
  // IsPositive,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateOperatorDTO {
  // @ApiProperty({ description: 'Id del Operador' })
  // @IsNumber()
  // @IsPositive()
  // readonly id: number;

  @ApiProperty({ description: 'Email del Operador' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Contraseña del Operador' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({ description: 'Rol del Operador' })
  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  readonly compradorId: number;
}
export class UpdateOperatorDTO extends PartialType(
  OmitType(CreateOperatorDTO, ['password']),
) {}
