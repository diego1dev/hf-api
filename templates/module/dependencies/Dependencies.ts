import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES } from './TypesDependencies';
import { ExampleController } from '../controllers';
import { ExampleUseCase } from '../useCases';
import { ExampleDAO } from '../infrastructure/db/dao';
import { ExampleRepository } from '../domain/repositories/ExampleRepository';
import { TypeExampleModel, Example } from '../infrastructure/db/models/Example';
import { IExampleService } from '../domain/interfaces/IExampleService';
import { ExampleService } from '../domain/services/ExampleService';

export const createDependencies = (): void => {
  GLOBAL_CONTAINER.bind<TypeExampleModel>(TYPESDEPENDENCIES.Model).toConstantValue(Example);
  GLOBAL_CONTAINER.bind<ExampleRepository>(TYPESDEPENDENCIES.DBRepository)
    .to(ExampleDAO)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<IExampleService>(TYPESDEPENDENCIES.Service)
    .to(ExampleService)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<ExampleController>(TYPESDEPENDENCIES.Controller)
    .to(ExampleController)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<ExampleUseCase>(TYPESDEPENDENCIES.UseCase)
    .to(ExampleUseCase)
    .inSingletonScope();
};

export default createDependencies;
