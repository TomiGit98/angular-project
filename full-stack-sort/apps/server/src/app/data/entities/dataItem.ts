import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsNumber } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { DataGroup } from './dataGroup';

export type DataItemDocument = HydratedDocument<DataItem>;

@Schema()
export class DataItem {
  _id: string;

  @IsNumber()
  @Prop()
  value: number;

  @IsDate()
  @Prop()
  creationDate: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'DataGroup' })
  dataGroup: DataGroup;
}

export const DataItemSchema = SchemaFactory.createForClass(DataItem);
