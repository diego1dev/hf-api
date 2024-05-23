import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES } from './TypesDependencies';
import { AuthController } from '../controllers';
import { AuthUseCase } from '../useCases';
import { IAuthService } from '../domain/interfaces/IAuthService';
import { AuthService } from '../domain/services/AuthService';
import { IJWTAdapter } from '../domain/interfaces/IJWTAdapter';
import { JWTAdapter } from '../domain/adapters/JWTAdapter';

export const createDependencies = (): void => {
  GLOBAL_CONTAINER.bind<IAuthService>(TYPESDEPENDENCIES.Service)
    .to(AuthService)
    .inSingletonScope();

  GLOBAL_CONTAINER.bind<IJWTAdapter>(TYPESDEPENDENCIES.UserJWTAdapter)
    .to(JWTAdapter)
    .inSingletonScope();

  GLOBAL_CONTAINER.bind<AuthController>(TYPESDEPENDENCIES.Controller)
    .to(AuthController)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<AuthUseCase>(TYPESDEPENDENCIES.UseCase)
    .to(AuthUseCase)
    .inSingletonScope();
};

export default createDependencies;
