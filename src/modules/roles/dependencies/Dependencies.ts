import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES } from './TypesDependencies';
import { RoleController } from '../controllers';
import { RoleUseCase } from '../useCases';
import { RoleDAO } from '../infrastructure/db/dao';
import { RoleRepository } from '../domain/repositories/RoleRepository';
import { TypeRoleModel, Role } from '../infrastructure/db/models/Role';
import { IRoleService } from '../domain/interfaces/IRoleService';
import { RoleService } from '../domain/services/RoleService';

export const createDependencies = (): void => {
  GLOBAL_CONTAINER.bind<TypeRoleModel>(TYPESDEPENDENCIES.Model).toConstantValue(Role);
  GLOBAL_CONTAINER.bind<RoleRepository>(TYPESDEPENDENCIES.DBRepository)
    .to(RoleDAO)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<IRoleService>(TYPESDEPENDENCIES.Service)
    .to(RoleService)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<RoleController>(TYPESDEPENDENCIES.Controller)
    .to(RoleController)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<RoleUseCase>(TYPESDEPENDENCIES.UseCase)
    .to(RoleUseCase)
    .inSingletonScope();
};

export default createDependencies;
