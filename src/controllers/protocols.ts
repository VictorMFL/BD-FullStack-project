/* eslint-disable @typescript-eslint/no-explicit-any */
export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T;
}

export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_RESQUEST = 400,
  SERVER_ERROR = 500,
}

export interface ControllerProps {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>
}
