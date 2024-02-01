import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import { DataService } from './data.service';
import { DataItemRequestDto } from './dto/dataItemRequestDto';
import { DataItemResponseDto } from './dto/dataItemResponseDto';
import {
  ErrorExceptionFilter,
  HttpExceptionFilter,
} from './exceptions/http-exception.filter';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @HttpCode(201)
  @UseFilters(new ErrorExceptionFilter())
  @Post('group')
  async createDataGroup() {
    console.log('Create data group!');
    const result = await this.dataService.createDataGroup();
    return `Created DataGroup: ${JSON.stringify(result)}`;
  }

  @HttpCode(201)
  @UseFilters(new HttpExceptionFilter())
  @UseFilters(new ErrorExceptionFilter())
  @Post(':groupId/item')
  async createDataGroupItem(
    @Param('groupId') groupId: string,
    @Body() dataItemDto: DataItemRequestDto
  ): Promise<DataItemResponseDto> {
    console.log(`groupId: ${groupId}`);
    const result = await this.dataService.create(groupId, dataItemDto);
    return {
      id: result._id,
      value: result.value,
      creationDate: result.creationDate,
      dataGroup: result.dataGroup,
    };
  }

  @HttpCode(200)
  @Get('dataitem/:dataItemId')
  findById(@Param() dataItemId: string) {
    return this.dataService.findById(dataItemId);
  }

  @HttpCode(200)
  @Get('groupid/:dataItemId')
  findAllByGroupId(@Param() dataGroupId: string) {
    return this.dataService.findByGroupId(dataGroupId);
  }
}
