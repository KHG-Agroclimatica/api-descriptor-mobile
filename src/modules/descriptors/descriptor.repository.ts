import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DescriptorDocument,
} from './schemas/Descriptor.schema';

@Injectable()
export class DescriptorRepository {
  constructor(
    @InjectModel('descriptors')
    private descriptorModel: Model<DescriptorDocument>,
  ) {}

  async filterDescriptorById(descriptorId: string) {
    try {
      const descriptor = await this.descriptorModel
        .findOne({ id: descriptorId, isActive: true })
        .populate('fields.fieldId')
        .populate('classificationId')
        .populate('relationshipId');

      if (!descriptor) throw new NotFoundException('Descriptor not found');

      return descriptor;
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Descriptor id is invalid');
    }
  }
}
