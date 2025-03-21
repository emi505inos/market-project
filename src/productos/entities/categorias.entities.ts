import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Categorias extends Document {
  @Prop()
  declare id: number;

  @Prop()
  nombre: string;
}
export const CategorySchema = SchemaFactory.createForClass(Categorias);
