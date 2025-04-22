import { ErrorRequestHandler } from 'express';

export class CustomError extends Error {

  constructor(status: number, message: string, source?: string, sendEmail: boolean = true) {
    super(message);

    this.status = status;
    this.message = message;

    if (source) {
      console.error(message, source, sendEmail);
    }
  }

  public status: number;
  public message: string;

}


export default class ErrorMiddleware {

  public init: ErrorRequestHandler = (err: CustomError, req, res, next) => {
    const status = err.status || 500;
    let message = err.message || 'Something went wrong. Please try again later.';

    if (err.status === 500) {
      message = 'Internal Server Error.';
    }

    res.status(status).send({ message });
  }

}
