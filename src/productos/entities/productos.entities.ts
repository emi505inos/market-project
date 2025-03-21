import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Fabricantes } from './fabricantes.entities';
// import { SubDoc, SubDocSchema } from './sub-doc.entities';

@Schema()
export class Productos extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  description: string;

  @Prop({ type: Number })
  precio: number;

  @Prop({ type: Number })
  stock: number;

  @Prop()
  origen: string;

  @Prop()
  imagen: string;

  // @Prop({ type: SubDocSchema })
  // subDoc: SubDoc;

  // @Prop({ type: [SubDocSchema] })
  // subDocs: Types.Array<SubDoc>;

  @Prop(
    raw({
      nombre: { type: String },
      imagen: { type: String },
    }),
  )
  categoria: Record<string, any>;
  @Prop({ type: Types.ObjectId, ref: Fabricantes.name })
  fabricante: Fabricantes | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Productos);
