import { IModule } from './IModule';

export interface IHttpServer {
  addModule(module: IModule): Promise<void>;
  start(port: number): void;
}
