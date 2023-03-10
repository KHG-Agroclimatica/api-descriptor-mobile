import mongoose, { HydratedDocument } from 'mongoose';
import { IFieldValueModel } from '../interfaces/item.models';
import { DescriptorModel } from './Descriptor.schema';

export type ItemDocument = HydratedDocument<ItemModel>;

export interface ItemModel {
  _id: String;
  descriptorId: String | DescriptorModel;
  name: string;
  fields?: Array<IFieldValueModel>;
  countries?: Array<String>;
  isActive: boolean;
  referencesIds: Array<String>;
}

export const ItemSchema = new mongoose.Schema<ItemModel>({
  name: { type: String, required: true },
  descriptorId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'descriptors' },
  fields: [
    {
      _id: false,
      fieldId: { type: mongoose.SchemaTypes.ObjectId, ref: 'fields' },
      value: { type: Object },
    },
  ],
  countries: [{ type: String }],
  isActive: { type: Boolean, required: true, default: true },
  referencesIds: [{ type: String }],
});
