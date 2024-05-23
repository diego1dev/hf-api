import { HTTPSTATUSCODE, IHttpResponse } from 'modules/common/interfaces';

export class Result {
  static ok<T>(data: T): IHttpResponse<T> {
    return {
      response: data,
      status: HTTPSTATUSCODE.OK,
    };
  }

  static failure<T>(exception: any): IHttpResponse<T> {
    const response = { message: exception?.message || 'unknown' };
    return {
      response,
      status: exception.status || HTTPSTATUSCODE.INTERNAL,
    };
  }
}

export default Result;
