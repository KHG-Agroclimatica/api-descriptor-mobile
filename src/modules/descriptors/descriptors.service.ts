import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GlobalResponse } from 'src/global/global.response';
import { DescriptorRepository } from './descriptor.repository';
import { FilterItemsDTO, ItemsByReferenceParams, LanguageParams } from './dto/request';
import { GetItemsParams } from './dto/request/get-items.params';
import { DescriptorDetailResponse } from './dto/responses/descriptor-detail.response';
import { FieldDocument } from './schemas/Field.schema';
import { ItemDocument } from './schemas/Item.schema';
import { descriptorMapperDetail } from './utils/descriptor-mapper-detail';
import { Mapper } from './utils/mapper';

@Injectable()
export class DescriptorsService {
  
  constructor(
    @InjectModel('items') private itemModel: Model<ItemDocument>,
    @InjectModel('fields') private fieldModel: Model<FieldDocument>,
    private readonly mapper: Mapper,
    private readonly descriptorRepository: DescriptorRepository,
  ) {}

  async filterDescriptorById(
    descriptorId: string,
  ): Promise<DescriptorDetailResponse> {
    const descriptor = await this.descriptorRepository.filterDescriptorById(
      descriptorId,
    );
    return descriptorMapperDetail(descriptor);
  }

  async GetItems(params: GetItemsParams): Promise<GlobalResponse> {
    const descriptor = await this.descriptorRepository.filterDescriptorById(
      params.descriptorId,
    );

    const itemList = await this.itemModel.find({
      descriptorId: params.descriptorId,
      countries: params.country,
      isActive: true,
    });

    const result = this.mapper.mapItems(itemList, descriptor.fields, params);

    return {
      data: result,
      message: '',
      statusCode: HttpStatus.OK,
    };
  }

  async filterItemsByRelated(params: ItemsByReferenceParams) {
    try {
      const itemsFiltered = await this.itemModel.find({
        descriptorId: params.descriptorId,
        referencesIds: params.referenceId,
        isActive: true,
      })
      .populate('fields.fieldId');

      return itemsFiltered;
    } catch (err) {
      throw new BadRequestException('Descriptor id is invalid');
    }
  }

  async filterAdvanceQuery(params: LanguageParams, filterDTO: FilterItemsDTO) {
    
  }
}
