import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES } from './TypesDependencies';
import { UserController } from '../controllers';
import { UserUseCase } from '../useCases';
import { UserDAO } from '../infrastructure/db/dao';
import { UserRepository } from '../domain/repositories/UserRepository';
import { TypeUserModel, User } from '../infrastructure/db/models/User';
import { IUserService } from '../domain/interfaces/IUserService';
import { UserService } from '../domain/services/UserService';
import UserPlan, { TypeUserPlanModel } from '../infrastructure/db/models/UserPlan';
import { IUserPlansAdapter } from '../domain/interfaces/IUserPlansAdapter';
import { UserPlanAdapter } from '../domain/adapters/userPlanAdapter';

export const createDependencies = (): void => {
  GLOBAL_CONTAINER.bind<TypeUserModel>(TYPESDEPENDENCIES.Model).toConstantValue(User);
  GLOBAL_CONTAINER.bind<IUserPlansAdapter>(TYPESDEPENDENCIES.UserPlanAdapter)
    .to(UserPlanAdapter)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<TypeUserPlanModel>(TYPESDEPENDENCIES.UserPlanModel)
    .toConstantValue(UserPlan);

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
