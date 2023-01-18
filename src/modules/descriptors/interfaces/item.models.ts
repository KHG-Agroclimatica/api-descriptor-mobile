export interface IValueTraductionModel {
  _id?: string;
  language: String;
  countries: Array<String>;
  value: string;
}

export interface IFieldValueModel {
  _id?: string;
  fieldId: string;
  value: Array<IValueTraductionModel | IImageModel>;
}

export interface IImageTraductionModel {
  _id?: string;
  name: string;
  language: String;
}

export interface IImageModel {
  _id?: string;
  name: string;
  uri: string;
  traduction: Array<IImageTraductionModel>;
}

export type ValueFieldType = Array<IValueTraductionModel | IImageModel>
