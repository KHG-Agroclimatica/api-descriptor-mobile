export class ItemListResponse {
    _id: String;
    name: String;
    fields: Array<ItemFieldsContent>
}

export interface ItemFieldsContent {
    name: String;
    type: String;
    value: FieldValueType; 
}

export interface ImageType  {
    name: String;
    uri: String;
}

export type FieldValueType = String | Array<ImageType>
