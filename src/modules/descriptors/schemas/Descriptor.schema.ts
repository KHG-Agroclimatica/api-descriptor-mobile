import mongoose, { HydratedDocument } from 'mongoose';
import { DescriptorField } from '../interfaces/descriptor.models';

export type DescriptorDocument = HydratedDocument<DescriptorModel>;

export interface DescriptorModel {
  _id?: string;
  name: string;
  description: string;
  fields: Array<DescriptorField>;
  countries: Array<String>;
  classificationId: String;
  isActive: boolean;
  relationshipId: String;
}

export const DescriptorScheme = new mongoose.Schema<DescriptorModel>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    fields: [
      {
        _id: false,
        fieldId: {
          type: mongoose.SchemaTypes.ObjectId,
          required: true,
          ref: 'fields',
        },
        order: { type: Number, required: true },
      },
    ],
    countries: [{ type: String, required: true }],
    classificationId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Classification',
    },
    isActive: { type: Boolean, required: true, default: true },
    relationshipId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Relationship',
    },
  },
  { timestamps: true },
);
