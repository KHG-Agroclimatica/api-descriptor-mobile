import mongoose, { HydratedDocument } from 'mongoose';
import { DescriptorField } from '../interfaces/descriptor.models';
import { ClassificationModel } from './Classification.schema';
import { RelationshipModel } from './RelationShip.schema';

export type DescriptorDocument = HydratedDocument<DescriptorModel>;

export interface DescriptorModel {
  _id?: string;
  name: string;
  description: string;
  fields: Array<DescriptorField>;
  countries: Array<String>;
  classificationId: String & ClassificationModel;
  isActive: boolean;
  relationshipId: String & RelationshipModel;
}

export const DescriptorSchema = new mongoose.Schema<DescriptorModel>(
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
      ref: 'classifications',
    },
    isActive: { type: Boolean, required: true, default: true },
    relationshipId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'relationships',
    },
  },
  { timestamps: true },
);
