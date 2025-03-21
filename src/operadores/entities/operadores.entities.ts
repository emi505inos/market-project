import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Operadores {
  @Prop()
  id: number;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;
}
export const OperadoresSchema = SchemaFactory.createForClass(Operadores);
