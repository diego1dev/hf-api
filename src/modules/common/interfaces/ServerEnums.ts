export enum TYPESSERVER {
  EXPRESS = 'express',
  FASTIFY = 'fastify',
}

export enum HTTPMETHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
}

export enum HTTPSTATUSCODE {
  OK = 200,
  INTERNAL = 500,
  UNPROCESSABLE_CONTENT = 422,
  CREATED = 201,
  NO_CONTENT = 204,
}
