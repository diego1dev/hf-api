import { ExpressServer } from './server/express';
import { FastifyServer } from './server/fastify';
import { IHttpServer, IModule, TYPESSERVER } from '../../interfaces';

export class ServerFactory {
  private server!: IHttpServer;

  public initModules(modules: (new () => IModule)[]): void {
    modules.forEach((ModuleType) => {
      const module = new ModuleType();
      this.server.addModule(module);
    });
  }

  createHttpServer(serverType: TYPESSERVER): IHttpServer {
    switch (serverType) {
      case TYPESSERVER.EXPRESS:
        this.server = new ExpressServer();
        break;
      case TYPESSERVER.FASTIFY:
        this.server = new FastifyServer();
        break;
      default:
        throw new Error(`Invalid server type: ${serverType}`);
    }
    return this.server;
  }
}
export default ServerFactory;
