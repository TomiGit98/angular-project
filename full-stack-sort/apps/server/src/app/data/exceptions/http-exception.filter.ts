import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { NotFoundException } from './not-found.exception';

@Catch(NotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    console.error(`Error: ${exception.message}`);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(404).json();
  }
}

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    console.error(`Error: ${JSON.stringify(exception)}`);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(500).json();
  }
}
