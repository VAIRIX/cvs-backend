import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { API_RESPONSE_MESSAGES } from 'src/constants/api-response-messages';
import { EntityNotFoundError, TypeORMError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  public catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message:
          (exception?.getResponse() as { message: string })?.message ??
          exception.message,
      });
    } else if (exception instanceof TypeORMError) {
      const { message, statusCode } = this.handleTypeORMError(exception);
      console.log(exception);
      response.status(statusCode).json({
        statusCode,
        message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      this.logger.error(exception);
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }

  private handleTypeORMError(exception: TypeORMError): {
    message: string;
    statusCode: number;
  } {
    switch (exception.constructor) {
      case EntityNotFoundError:
        return {
          statusCode: HttpStatus.NOT_FOUND,
          message: API_RESPONSE_MESSAGES.RESOURCE_NOT_FOUND,
        };
      default:
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: API_RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR,
        };
    }
  }
}
