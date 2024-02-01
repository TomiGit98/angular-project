import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { DataItem, DataItemSchema } from './entities/dataItem';
import { MongooseModule } from '@nestjs/mongoose';
import { DataGroup, DataGroupSchema } from './entities/dataGroup';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DataItem.name, schema: DataItemSchema },
      { name: DataGroup.name, schema: DataGroupSchema },
    ]),
  ],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
