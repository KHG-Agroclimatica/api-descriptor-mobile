import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GlobalResponse } from 'src/global/global.response';
import { GetItemsParams } from './dto/get-items.params';
import { FieldDocument } from './schemas/Field.schema';
import { ItemDocument } from './schemas/Item.schema';
import { Mapper } from './utils/mapper';

@Injectable()
export class DescriptorsService {
  constructor(
    @InjectModel('items') private itemModel: Model<ItemDocument>,
    @InjectModel('fields') private fieldModel: Model<FieldDocument>,
    @InjectModel('descriptors') private descriptorModel: Model<FieldDocument>,
    private readonly mapper: Mapper,
  ) {}

  async GetItems(params: GetItemsParams): Promise<GlobalResponse> {
    try {
      // filter descriptor 
      const itemList = await this.itemModel.find({
        descriptorId: params.descriptorId,
        countries: params.country,
        isActive: true,
      });

      if (!itemList)
        throw new HttpException('Not found itemList', HttpStatus.NOT_FOUND);

        
      const fieldModel = await this.fieldModel.find({
        isActive: true,
      });

      const result = this.mapper.mapItems(itemList, fieldModel, params);

      return {
        data: result,
        message: '',
      };
    } catch (err) {
      throw new HttpException(
        {
          message: 'not found descriptor',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
