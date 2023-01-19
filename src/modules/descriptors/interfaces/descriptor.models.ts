import { FieldModel } from "../schemas/Field.schema";

export interface DescriptorField {
    fieldId: String & FieldModel;
    order: Number;
}