import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES } from './TypesDependencies';
import { PlanStatusController } from '../controllers';
import { PlanStatusUseCase } from '../useCases';
import { PlanStatusDAO } from '../infrastructure/db/dao';
import { PlanStatusRepository } from '../domain/repositories/PlanStatusRepository';
import { TypePlanStatusModel, PlanStatus } from '../infrastructure/db/models/PlanStatus';
import { IPlanStatusService } from '../domain/interfaces/IPlanStatusService';
import { PlanStatusService } from '../domain/services/PlanStatusService';

export const createDependencies = (): void => {
  GLOBAL_CONTAINER.bind<TypePlanStatusModel>(TYPESDEPENDENCIES.Model).toConstantValue(PlanStatus);
  GLOBAL_CONTAINER.bind<PlanStatusRepository>(TYPESDEPENDENCIES.DBRepository)
    .to(PlanStatusDAO)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<IPlanStatusService>(TYPESDEPENDENCIES.Service)
    .to(PlanStatusService)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<PlanStatusController>(TYPESDEPENDENCIES.Controller)
    .to(PlanStatusController)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<PlanStatusUseCase>(TYPESDEPENDENCIES.UseCase)
    .to(PlanStatusUseCase)
    .inSingletonScope();
};

export default createDependencies;
