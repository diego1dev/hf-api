import { HTTPMETHOD, IEnpoint, IModule } from 'modules/common/interfaces';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { AuthController } from '../controllers';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { createDependencies } from '../dependencies/Dependencies';
import { authenticateLocal, isAuthenticate } from '../infrastructure/auth/config';

export class AuthRouter implements IModule {
  private readonly endpoint = '/';

  private readonly controller:AuthController;

  constructor() {
    createDependencies();
    this.controller = GLOBAL_CONTAINER.get<AuthController>(TYPESDEPENDENCIES.Controller);
  }

  getEndpoints = ():IEnpoint[] => [
    {
      method: HTTPMETHOD.POST,
      url: '/register/local',
      event: this.controller.registerLocal.bind(this.controller),
    },
    {
      method: HTTPMETHOD.POST,
      handler: authenticateLocal,
      url: '/login/local',
      event: this.controller.loginLocal.bind(this.controller),
    },
    {
      method: HTTPMETHOD.GET,
      handler: isAuthenticate,
      url: '/login/google',
      event: this.controller.loginGoogle.bind(this.controller),

    },
  ];

  get path() {
    return this.endpoint;
  }
}

export default AuthRouter;
