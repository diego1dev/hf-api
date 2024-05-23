interface ErrorResponse {
  message: string;
}

export interface ResponseMethod<T> {
  data: T;
  message: string;
}
export interface IHttpResponse<T> {
  response: T | ErrorResponse;
  status: number;
}
