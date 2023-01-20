export interface DescriptorDetailResponse {
    _id: string;
    name: string;
    countries: string[];
    fields: FieldDetailResponse[];
    classification: string;
    relatedTo: string;
}

export interface FieldDetailResponse {
    order: number;
    name: string;
    description: string;
    type: string;
}
