import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Compradores extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  phone: string;

  @Prop({
    type: [
      {
        calle: { type: String },
        numero: { type: String },
        ciudad: { type: String },
      },
    ],
  })
  direcciones: Types.Array<Record<string, any>>;
}

export const BuyersSchema = SchemaFactory.createForClass(Compradores);
