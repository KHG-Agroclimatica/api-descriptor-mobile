import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DescriptorDocument,
  DescriptorModel,
} from './schemas/Descriptor.schema';

@Injectable()
export class DescriptorRepository {
  constructor(
    @InjectModel('descriptors')
    private descriptorModel: Model<DescriptorDocument>,
  ) {}

  async filterDescriptorAndGetFields(descriptorId: string) {
    let descriptor: DescriptorModel;

    try{
      descriptor = await this.descriptorModel
      .findById(descriptorId)
      .populate('fields.fieldId');
    }catch(err){
      throw new BadRequestException('Descriptor id is invalid');
    }


    if (!descriptor) throw new NotFoundException('Descriptor not found');
  }
}
