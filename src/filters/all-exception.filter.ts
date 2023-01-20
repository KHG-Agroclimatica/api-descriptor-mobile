import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from "express";
import { GlobalResponse } from 'src/global/global.response';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody: GlobalResponse = {
      statusCode: status,
      data: null,
      message: status == HttpStatus.INTERNAL_SERVER_ERROR ? 'Internal server error' : exception?.message ?? ''
    }

    response.status(status).json({
      ...responseBody,
      path: request.url,
    });
  }
}
