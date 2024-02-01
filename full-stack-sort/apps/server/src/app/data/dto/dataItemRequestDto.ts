import { IsNotEmpty, IsNumber } from 'class-validator';

export class DataItemRequestDto {
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
