import mongoose, { HydratedDocument } from "mongoose";
import { IFieldValueModel } from "../interfaces/item.models";

export type ItemDocument = HydratedDocument<ItemModel>;

export interface ItemModel {
  _id: String;
  descriptorId: String;
  name: string;
  fields?: Array<IFieldValueModel>;
  countries?: Array<String>;
  isActive: boolean;
  referencesIds: Array<Number>;
}

export const ItemSchema = new mongoose.Schema<ItemModel>({
  name: { type: String, required: true },
  descriptorId: { type: mongoose.SchemaTypes.ObjectId, required: true },
  fields: [{ type: Object }],
  countries: [{ type: String }],
  isActive: { type: Boolean, required: true, default: true },
  referencesIds: [{ type: Number }], 
},);