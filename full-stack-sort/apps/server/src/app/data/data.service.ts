import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, startSession } from 'mongoose';
import { DataItemRequestDto } from './dto/dataItemRequestDto';
import { DataItem } from './entities/dataItem';
import { DataGroup } from './entities/dataGroup';
import { NotFoundException } from './exceptions/not-found.exception';

@Injectable()
export class DataService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(DataItem.name) private dataItemModel: Model<DataItem>,
    @InjectModel(DataGroup.name) private dataGroupModel: Model<DataGroup>
  ) {}

  async createDataGroup(): Promise<DataGroup> {
    const createdDataGroup = new this.dataGroupModel();
    return createdDataGroup.save();
  }

  async create(
    dataGroupId: string,
    dataItemDto: DataItemRequestDto
  ): Promise<DataItem> {
    const dataGroup = await this.dataGroupModel.findById({ _id: dataGroupId });
    console.log('GROUP: ' + JSON.stringify(dataGroup));
    if (dataGroup) {
      const transactionSession = await this.connection.startSession();
      transactionSession.startTransaction();

      try {
        const createdDataItem = new this.dataItemModel({
          value: dataItemDto.value,
          creationDate: new Date(),
          dataGroup: dataGroup,
        });
        await createdDataItem.save();

        dataGroup.dataItems.push(createdDataItem);
        dataGroup.save();

        return createdDataItem;
      } catch (error) {
        await transactionSession.abortTransaction();
        throw error;
      } finally {
        await transactionSession.endSession();
      }
    } else {
      throw new NotFoundException('DataGroup not found');
    }
  }

  findById(dataItemId: string) {
    return this.dataItemModel.findById({ id: dataItemId });
  }

  findByGroupId(dataGroupId) {
    return this.dataItemModel.find({ dataGroupId: dataGroupId });
  }

  deleteById(dataItemId: string) {
    this.dataItemModel.deleteOne({ id: dataItemId });
  }
}
