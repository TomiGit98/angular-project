import { DataGroup } from '../entities/dataGroup';

export class DataItemResponseDto {
  id: string;
  value: number;
  creationDate: Date;
  dataGroup: DataGroup;
}
