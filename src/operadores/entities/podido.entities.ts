import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Productos } from 'src/productos/entities/productos.entities';

@Schema()
export class Pedidos {
  @Prop({ type: [{ type: Types.ObjectId, ref: Productos.name }] })
  productos: Types.Array<Productos>;
}
export const OrderSchema = SchemaFactory.createForClass(Pedidos);
