import fastify, {
  FastifyInstance, FastifyPluginAsync, RouteHandlerMethod, RouteShorthandOptions,
} from 'fastify';
import { ENV } from 'modules/common/utils/env';
import { loggerOptions } from 'modules/common/infrastructure/logger';
import {
  IModule, IHttpServer, IEnpoint, HTTPMETHOD,
} from 'modules/common/interfaces';
import { onRoute } from './hooks';

declare module 'fastify' {
  interface FastifyRequest {
    user?: any;
  }
}

const getRequestHandler = (endpoint:IEnpoint):RouteHandlerMethod<any> => async (req, reply) => {
  const request = {
    user: req.user,
    data: {
      ...(typeof req.body === 'object' ? req.body : {}),
      ...(typeof req.params === 'object' ? req.params : {}),
      ...(typeof req.query === 'object' ? req.query : {}),
    },
  };
  const result = await endpoint.event(request);
  reply.status(result.status).type('json').send(JSON.stringify(result.response));
};

export class FastifyServer implements IHttpServer {
  private readonly app: FastifyInstance;

  constructor() {
    this.app = fastify({ logger: loggerOptions });
    this.app.addHook('onRoute', onRoute);
  }

  addModule = async (newModule:IModule) => {
    const pluggin:FastifyPluginAsync = async (router) => {
      const paths = newModule.getEndpoints();
      paths.forEach((endpoint) => {
        const { url } = endpoint;
        const shortHandOptions:RouteShorthandOptions = { preHandler: endpoint.handler };
        switch (endpoint.method) {
          case HTTPMETHOD.POST:
            router.post(url, shortHandOptions, getRequestHandler(endpoint));
            break;
          case HTTPMETHOD.PUT:
            router.put(url, shortHandOptions, getRequestHandler(endpoint));
            break;
          case HTTPMETHOD.PATCH:
            router.patch(url, shortHandOptions, getRequestHandler(endpoint));
            break;
          case HTTPMETHOD.DELETE:
            router.delete(url, shortHandOptions, getRequestHandler(endpoint));
            break;
          case HTTPMETHOD.GET:
          default:
            router.get(url, shortHandOptions, getRequestHandler(endpoint));
            break;
        }
      });
    };
    this.app.register(pluggin, {
      prefix: `${ENV.PREFIX}${newModule.path}`,
    });
  };

  start(port: number): void {
    this.app.listen({ port, host: '0.0.0.0' }, (err, address) => {
      if (err) {
        this.app.log.fatal(err);
        process.exit(1);
      }
      this.app.log.info(`Fastify server listening on ${address}`);
    });
  }
}

export default FastifyServer;
