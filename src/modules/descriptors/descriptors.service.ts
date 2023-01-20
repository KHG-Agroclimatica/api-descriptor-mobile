import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GlobalResponse } from 'src/global/global.response';
import { DescriptorRepository } from './descriptor.repository';
import { GetItemsParams } from './dto/get-items.params';
import { DescriptorDetailResponse } from './dto/responses/descriptor-detail.response';
import { FieldDocument } from './schemas/Field.schema';
import { ItemDocument } from './schemas/Item.schema';
import { descriptorMapperDetail } from './utils/descriptor-mapper-detail';
import { DescriptorUtil } from './utils/descriptor.util';
import { Mapper } from './utils/mapper';

@Injectable()
export class DescriptorsService {
  constructor(
    @InjectModel('items') private itemModel: Model<ItemDocument>,
    @InjectModel('fields') private fieldModel: Model<FieldDocument>,
    private readonly mapper: Mapper,
    private readonly descriptorRepository: DescriptorRepository,
    private readonly descriptorUtil: DescriptorUtil,
  ) {}

  async filterDescriptorById(descriptorId: string): Promise<DescriptorDetailResponse> {
    const descriptor = await this.descriptorRepository.filterDescriptorById(
      descriptorId,
    );
    return descriptorMapperDetail(descriptor);
  }

  async GetItems(params: GetItemsParams): Promise<GlobalResponse> {
    //filter descriptor

    const descriptor = await this.descriptorRepository.filterDescriptorById(
      params.descriptorId,
    );
    const fields = this.descriptorUtil.filterActiveFields(descriptor);

    const itemList = await this.itemModel.find({
      descriptorId: params.descriptorId,
      countries: params.country,
      isActive: true,
    });

    const result = this.mapper.mapItems(itemList, fields, params);

    return {
      data: result,
      message: '',
      statusCode: HttpStatus.OK,
    };
  }
}
