import { HttpStatus } from "@nestjs/common";

export interface GlobalResponse {
    statusCode: HttpStatus;
    message?: string;
    data?: any;
}