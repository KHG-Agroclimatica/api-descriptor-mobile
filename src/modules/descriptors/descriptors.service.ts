import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetItemsParams } from './dto/get-items.params';
import { FieldDocument } from './schemas/Field.schema';
import { ItemDocument } from './schemas/Item.schema';
import { Mapper } from './utils/mapper';

@Injectable()
export class DescriptorsService {
  constructor(
    @InjectModel('items') private itemModel: Model<ItemDocument>,
    @InjectModel('fields') private fieldModel: Model<FieldDocument>,
    private readonly mapper: Mapper,
  ) {}

  async GetItems(params: GetItemsParams) {
    const itemList = await this.itemModel.find({
      descriptorId: params.descriptorId,
      countries: params.country,
      isActive: true
    });

    const fieldModel = await this.fieldModel.find({
      isActive: true
    });

    const result = this.mapper.mapItems(itemList, fieldModel, params);

    return result;
  }
}
