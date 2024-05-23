import { HTTPMETHOD, IEnpoint, IModule } from 'modules/common/interfaces';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { isAuthenticate } from 'modules/auth/infrastructure/auth/config';
import { PlanController } from '../controllers';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { createDependencies } from '../dependencies/Dependencies';

export class PlanRouter implements IModule {
  private readonly endpoint = '/plans';

  private readonly controller:PlanController;

  constructor() {
    createDependencies();
    this.controller = GLOBAL_CONTAINER.get<PlanController>(TYPESDEPENDENCIES.Controller);
  }

  getEndpoints = ():IEnpoint[] => [
    {
      method: HTTPMETHOD.POST,
      handler: isAuthenticate,
      url: '/',
      event: this.controller.create.bind(this.controller),
    },
    {
      method: HTTPMETHOD.GET,
      handler: isAuthenticate,
      url: '/',
      event: this.controller.getAll.bind(this.controller),
    },
    {
      method: HTTPMETHOD.GET,
      handler: isAuthenticate,
      url: '/:id',
      event: this.controller.getById.bind(this.controller),
    },
    {
      method: HTTPMETHOD.PUT,
      handler: isAuthenticate,
      url: '/:id',
      event: this.controller.update.bind(this.controller),
    },
    {
      method: HTTPMETHOD.DELETE,
      handler: isAuthenticate,
      url: '/:id',
      event: this.controller.delete.bind(this.controller),
    },
  ];

  get path() {
    return this.endpoint;
  }
}

export default PlanRouter;
