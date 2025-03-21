import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
  // IsArray,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
} from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateCategoriaDTO } from './categoria.dto';
// import { CreateSubDocDto } from './sub-doc.dto';
// import { Type } from 'class-transformer';

export class CreateProductDTO {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @ApiProperty({ description: 'Descripción del producto' })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  @IsNotEmpty()
  readonly precio: number;

  @ApiProperty({ description: 'Stock del producto' })
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty({ description: 'Origen del producto' })
  @IsString()
  @IsNotEmpty()
  readonly origen: string;

  @ApiProperty({ description: 'Imagen del producto' })
  @IsUrl()
  @IsNotEmpty()
  readonly imagen: string;

  // @ApiProperty()
  // @IsNotEmpty()
  // @IsPositive()
  // readonly fabricanteId: number;

  // @ApiProperty()
  // @IsArray()
  // @IsNotEmpty()
  // readonly categoriasIds: number[];

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  readonly categoria: CreateCategoriaDTO;

  @IsNotEmpty()
  @IsMongoId()
  readonly fabricante: string;
}
export class UpdateProductDTO extends PartialType(
  OmitType(CreateProductDTO, ['nombre']),
) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  precioMinimo?: number;

  @ValidateIf((params: FilterProductsDto) => params.precioMinimo !== undefined)
  @IsPositive()
  precioMaximo?: number;

  @IsNotEmpty()
  @ValidateNested()
  @ApiProperty()
  readonly categoria: CreateCategoriaDTO;

  @IsNotEmpty()
  @IsMongoId()
  readonly fabricante: string;

  // @IsNotEmpty()
  // @ValidateNested()
  // readonly subDoc: CreateSubDocDto;

  // @IsNotEmpty()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateSubDocDto)
  // readonly subDocs: CreateSubDocDto[];
}
