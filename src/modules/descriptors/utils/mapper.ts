import { Injectable } from '@nestjs/common';
import { GetItemsParams } from '../dto/request/get-items.params';
import {
  FieldValueType,
  ImageType,
  ItemFieldsContent,
  ItemListResponse,
} from '../dto/responses/item-list.response';
import { DescriptorField } from '../interfaces/descriptor.models';
import {
  IImageModel,
  IValueTraductionModel,
  ValueFieldType,
} from '../interfaces/item.models';
import { ItemModel } from '../schemas/Item.schema';

@Injectable()
export class Mapper {
  mapItems(
    itemList: ItemModel[],
    fieldList: DescriptorField[],
    params: GetItemsParams,
  ): ItemListResponse[] {
    const itemResult: ItemListResponse[] = [];

    for (const item of itemList) {
      let fieldResult: ItemFieldsContent[] = [];
      
      for (const { fieldId: fieldDescriptor, order } of fieldList) {
        if (!order) continue;

        let valueField = null;

        const itemField = item.fields.find(
          (field) => field.fieldId.toString() == fieldDescriptor._id.toString(),
        );

        if (itemField) {
          valueField = this.getFieldValue(fieldDescriptor.typeField, {
            value: itemField.value,
            language: params.language,
            country: params.country,
          });
        }

        fieldResult.push({
          name: fieldDescriptor.name.toString(),
          value: valueField,
          type: fieldDescriptor.typeField.toString(),
          order: order,
        });
      }
    
      itemResult.push({
        _id: item._id.toString(),
        fields: fieldResult,
        name: item.name,
        referenceIds: item.referencesIds
      });
    }

    return itemResult;
  }

  private getFieldValue(type: String, data: paramsValueMapper): FieldValueType {
    switch (type) {
      case 'RICH_TEXT':
        return this.rich_text_map(data);
      case 'IMAGE':
        return this.image_map(data);
    }
  }

  private rich_text_map(data: paramsValueMapper): string {
    const values = <IValueTraductionModel[]>data.value;

    const value = values.find(
      (value) =>
        value.language == data.language &&
        value.countries.includes(data.country),
    );

    return value?.value;
  }

  private image_map(data: paramsValueMapper): ImageType[] {
    const values = <IImageModel[]>data.value;

    const imageResult: ImageType[] = [];

    values.forEach((imageValue, index) => {
      const traduction = imageValue.traduction.find(
        (traduction) => traduction.language == data.language,
      );

      if (traduction)
        imageResult.push({
          name: traduction.name,
          uri: imageValue.uri,
          order: imageValue.order ?? index,
          type: imageValue.typeImage,
        });
    });

    if (imageResult.length == 0) return null;

    return imageResult;
  }
}

interface paramsValueMapper {
  language: string;
  country: string;
  value: ValueFieldType;
}
