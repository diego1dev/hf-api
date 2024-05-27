/* eslint-disable class-methods-use-this */
import express, { RequestHandler, Router } from 'express';
import cors from 'cors';
import { ENV } from 'modules/common/utils/env';
import { PrettyLogger } from 'modules/common/infrastructure/logger';
import {
  IModule, IHttpServer, IEnpoint, HTTPMETHOD,
} from 'modules/common/interfaces';
import passport from 'modules/auth/infrastructure/auth/config';

export class ExpressServer implements IHttpServer {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(passport.initialize());
    this.app.use(cors());
  }

  addModule = async (newModule:IModule) => {
    const router = Router();
    const endpoints = newModule.getEndpoints();
    endpoints.forEach((endpoint) => {
      const { url } = endpoint;
      const endpointHndler = endpoint.handler || this.defaultHandler;
      switch (endpoint.method) {
        case HTTPMETHOD.POST:
          router.post(url, endpointHndler, this.getRequestHandler(endpoint));
          break;
        case HTTPMETHOD.PUT:
          router.put(url, endpointHndler, this.getRequestHandler(endpoint));
          break;
        case HTTPMETHOD.PATCH:
          router.patch(url, endpointHndler, this.getRequestHandler(endpoint));
          break;
        case HTTPMETHOD.DELETE:
          router.delete(url, endpointHndler, this.getRequestHandler(endpoint));
          break;
        case HTTPMETHOD.GET:
        default:
          router.get(url, endpointHndler, this.getRequestHandler(endpoint));
          break;
      }
    });

    this.app.use(`${ENV.PREFIX}${newModule.path}`, router);
  };

  start(port: number): void {
    try {
      this.app.listen(port, '0.0.0.0', () => {
        PrettyLogger.info(`Express server running on port ${port}`);
      });
    } catch (err) {
      PrettyLogger.fatal(err);
      process.exit(1);
    }
  }

  private getRequestHandler = (endpoint:IEnpoint):RequestHandler => async (req, reply) => {
    const request = {
      user: req.user,
      data: {
        ...req.body,
        ...req.params,
        ...req.query,
      },
    };
    const result = await endpoint.event(request);
    reply.status(result.status).type('json').send(JSON.stringify(result.response));
  };

  private defaultHandler:RequestHandler = (_req, _res, next) => {
    next();
  };
}

export default ExpressServer;
