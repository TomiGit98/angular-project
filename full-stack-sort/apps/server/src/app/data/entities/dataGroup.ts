import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { DataItem } from './dataItem';

export type DocumentNameDocument = HydratedDocument<DataGroup>;

@Schema()
export class DataGroup {
  _id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DataItem' }] })
  dataItems: DataItem[];
}

export const DataGroupSchema = SchemaFactory.createForClass(DataGroup);
