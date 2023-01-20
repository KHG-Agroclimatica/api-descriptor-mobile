import { FieldModel } from "../schemas/Field.schema";

export interface DescriptorField {
    fieldId: string & FieldModel;
    order: number;
}