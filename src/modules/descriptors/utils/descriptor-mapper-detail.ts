import {
  DescriptorDetailResponse,
  FieldDetailResponse,
} from '../dto/responses/descriptor-detail.response';
import { DescriptorModel } from '../schemas/Descriptor.schema';

export function descriptorMapperDetail(
  descriptor: DescriptorModel,
): DescriptorDetailResponse {
  const fields: FieldDetailResponse[] = [];

  descriptor.fields.filter(({ fieldId: field, order }) => {
    if (field) {
      fields.push({
        name: field.name,
        description: field.description,
        order: order,
        type: field.typeField.toString(),
      });
    }
  });

  return {
    _id: descriptor._id,
    name: descriptor.name,
    classification: descriptor.classificationId.name.toString(),
    countries: descriptor.countries.map((i) => i.toString()),
    relatedTo: descriptor.relationshipId.name.toString(),
    fields: fields,
  };
}
