import mongoose, { HydratedDocument } from 'mongoose';

export type FieldDocument = HydratedDocument<FieldModel>;

export interface FieldModel {
  _id?: string;
  name: string;
  description?: string;
  typeField: String;
  classificationId: Array<String>;
  isActive: boolean;
}

export const FieldSchema = new mongoose.Schema<FieldModel>({
  name: { type: String, required: true },
  description: { type: String },
  typeField: { type: String, required: true },
  classificationId: [
    { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "Classification" },
  ],
  isActive: { type: Boolean, required: true, default: true },
},);
