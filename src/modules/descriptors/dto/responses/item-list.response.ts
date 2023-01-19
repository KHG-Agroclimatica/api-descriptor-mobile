export class ItemListResponse {
    _id: string;
    name: string;
    fields: Array<ItemFieldsContent>
}

export interface ItemFieldsContent {
    name: string;
    type: string;
    order: number;
    value: FieldValueType; 
}

export interface ImageType  {
    order: number;
    type: string;
    name: string;
    uri: string;
}

export type FieldValueType = string | Array<ImageType>
