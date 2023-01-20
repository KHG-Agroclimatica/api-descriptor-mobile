import { HydratedDocument, Schema } from 'mongoose';

export type DescriptorDocument = HydratedDocument<RelationshipModel>;

export interface RelationshipModel {
  _id?: String;
  name: String;
  api: Object;
  isActive: boolean;
}

export const RelationshipSchema = new Schema<RelationshipModel>({
  name: { type: String, required: true },
  api: { type: Object, required: true },
  isActive: { type: Boolean, required: true, default: true },
});
