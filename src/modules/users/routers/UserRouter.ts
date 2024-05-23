import { HTTPMETHOD, IEnpoint, IModule } from 'modules/common/interfaces';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { isAuthenticate } from 'modules/auth/infrastructure/auth/config';
import { UserController } from '../controllers';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { createDependencies } from '../dependencies/Dependencies';

export class UserRouter implements IModule {
  private readonly endpoint = '/users';

  private readonly controller:UserController;

  constructor() {
    createDependencies();
    this.controller = GLOBAL_CONTAINER.get<UserController>(TYPESDEPENDENCIES.Controller);
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
    {
      method: HTTPMETHOD.PATCH,
      handler: isAuthenticate,
      url: '/:id/roles',
      event: this.controller.roleAssignments.bind(this.controller),
    },
    {
      method: HTTPMETHOD.PATCH,
      handler: isAuthenticate,
      url: '/:id/features',
      event: this.controller.featureAssignments.bind(this.controller),
    },
  ];

  get path() {
    return this.endpoint;
  }
}

export default UserRouter;
