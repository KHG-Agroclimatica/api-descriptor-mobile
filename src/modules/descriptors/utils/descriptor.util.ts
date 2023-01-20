import { Injectable } from '@nestjs/common';
import { DescriptorModel } from '../schemas/Descriptor.schema';

@Injectable()
export class DescriptorUtil {
  public filterActiveFields = (descriptor: DescriptorModel) =>
    descriptor.fields.filter((field) => field.fieldId.isActive == true);
}
