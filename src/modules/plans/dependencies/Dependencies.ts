import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES } from './TypesDependencies';
import { PlanController } from '../controllers';
import { PlanUseCase } from '../useCases';
import { PlanDAO } from '../infrastructure/db/dao';
import { PlanRepository } from '../domain/repositories/PlanRepository';
import { TypePlanModel, Plan } from '../infrastructure/db/models/Plan';
import { IPlanService } from '../domain/interfaces/IPlanService';
import { PlanService } from '../domain/services/PlanService';

export const createDependencies = (): void => {
  GLOBAL_CONTAINER.bind<TypePlanModel>(TYPESDEPENDENCIES.Model).toConstantValue(Plan);
  GLOBAL_CONTAINER.bind<PlanRepository>(TYPESDEPENDENCIES.DBRepository)
    .to(PlanDAO)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<IPlanService>(TYPESDEPENDENCIES.Service)
    .to(PlanService)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<PlanController>(TYPESDEPENDENCIES.Controller)
    .to(PlanController)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<PlanUseCase>(TYPESDEPENDENCIES.UseCase)
    .to(PlanUseCase)
    .inSingletonScope();
};

export default createDependencies;
