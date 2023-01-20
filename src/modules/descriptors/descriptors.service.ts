import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GlobalResponse } from 'src/global/global.response';
import { DescriptorRepository } from './descriptor.repository';
import { GetItemsParams } from './dto/get-items.params';
import { DescriptorDocument } from './schemas/Descriptor.schema';
import { FieldDocument } from './schemas/Field.schema';
import { ItemDocument } from './schemas/Item.schema';
import { Mapper } from './utils/mapper';

@Injectable()
export class DescriptorsService {
  constructor(
    @InjectModel('items') private itemModel: Model<ItemDocument>,
    @InjectModel('fields') private fieldModel: Model<FieldDocument>,
    private readonly mapper: Mapper,
    private readonly descriptorRepository: DescriptorRepository
  ) {}

  async GetItems(params: GetItemsParams): Promise<GlobalResponse> {
      //filter descriptor 
      await this.descriptorRepository.filterDescriptorAndGetFields(params.descriptorId);

      const itemList = await this.itemModel.find({
        descriptorId: params.descriptorId,
        countries: params.country,
        isActive: true,
      });

      const fieldModel = await this.fieldModel.find({
        isActive: true,
      });

      const result = this.mapper.mapItems(itemList, fieldModel, params);

      return {
        data: result,
        message: '',
        statusCode: HttpStatus.OK
      };
  }
}
