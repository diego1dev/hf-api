import { IEnpoint } from './IEndpoint';

export interface IModule {
  path: string;
  getEndpoints(): IEnpoint[];
}
