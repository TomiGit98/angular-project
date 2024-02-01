import { Module } from '@nestjs/common';

import { DataModule } from './data/data.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    DataModule,
    MongooseModule.forRoot('mongodb://user:password@localhost:27017', {
      dbName: 'sortdb',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
