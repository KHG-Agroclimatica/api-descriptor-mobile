import { HydratedDocument, Schema } from 'mongoose';

export type DescriptorDocument = HydratedDocument<ClassificationModel>;

export interface ClassificationModel {
  _id: String;
  name: String;
  description: String;
  isActive: boolean;
}

export const ClassificationSchema = new Schema<ClassificationModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
});
