import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES } from './TypesDependencies';
import { UserController } from '../controllers';
import { UserUseCase } from '../useCases';
import { UserDAO } from '../infrastructure/db/dao';
import { UserRepository } from '../domain/repositories/UserRepository';
import { TypeUserModel, User } from '../infrastructure/db/models/User';
import { IUserService } from '../domain/interfaces/IUserService';
import { UserService } from '../domain/services/UserService';

export const createDependencies = (): void => {
  GLOBAL_CONTAINER.bind<TypeUserModel>(TYPESDEPENDENCIES.Model).toConstantValue(User);
  GLOBAL_CONTAINER.bind<UserRepository>(TYPESDEPENDENCIES.DBRepository)
    .to(UserDAO)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<IUserService>(TYPESDEPENDENCIES.Service)
    .to(UserService)
    .inSingletonScope();

  GLOBAL_CONTAINER.bind<UserController>(TYPESDEPENDENCIES.Controller)
    .to(UserController)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<UserUseCase>(TYPESDEPENDENCIES.UseCase)
    .to(UserUseCase)
    .inSingletonScope();
};

export default createDependencies;
