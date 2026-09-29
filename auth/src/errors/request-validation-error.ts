import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string }[] {
    // express validator returns an array of errors, we need to format them to send them to the client
    const formatedErrors = this.errors.map((error) => {
      // if the error is a field error, we need to send the field name and the error message
      if (error.type === 'field') {
        return { message: error.msg, field: error.path };
      }

      return { message: error.msg };
    });

    return formatedErrors;
  }
}

