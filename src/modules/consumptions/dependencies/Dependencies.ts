import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES } from './TypesDependencies';
import { ConsumptionController } from '../controllers';
import { ConsumptionUseCase } from '../useCases';
import { ConsumptionDAO } from '../infrastructure/db/dao';
import { ConsumptionRepository } from '../domain/repositories/ConsumptionRepository';
import { TypeConsumptionModel, Consumption } from '../infrastructure/db/models/Consumption';
import { IConsumptionService } from '../domain/interfaces/IConsumptionService';
import { ConsumptionService } from '../domain/services/ConsumptionService';

export const createDependencies = (): void => {
  GLOBAL_CONTAINER.bind<TypeConsumptionModel>(TYPESDEPENDENCIES.Model).toConstantValue(Consumption);
  GLOBAL_CONTAINER.bind<ConsumptionRepository>(TYPESDEPENDENCIES.DBRepository)
    .to(ConsumptionDAO)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<IConsumptionService>(TYPESDEPENDENCIES.Service)
    .to(ConsumptionService)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<ConsumptionController>(TYPESDEPENDENCIES.Controller)
    .to(ConsumptionController)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<ConsumptionUseCase>(TYPESDEPENDENCIES.UseCase)
    .to(ConsumptionUseCase)
    .inSingletonScope();
};

export default createDependencies;
