import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES } from './TypesDependencies';
import { FeatureController } from '../controllers';
import { FeatureUseCase } from '../useCases';
import { FeatureDAO } from '../infrastructure/db/dao';
import { FeatureRepository } from '../domain/repositories/FeatureRepository';
import { TypeFeatureModel, Feature } from '../infrastructure/db/models/Feature';
import { IFeatureService } from '../domain/interfaces/IFeatureService';
import { FeatureService } from '../domain/services/FeatureService';

export const createDependencies = (): void => {
  GLOBAL_CONTAINER.bind<TypeFeatureModel>(TYPESDEPENDENCIES.Model).toConstantValue(Feature);
  GLOBAL_CONTAINER.bind<FeatureRepository>(TYPESDEPENDENCIES.DBRepository)
    .to(FeatureDAO)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<IFeatureService>(TYPESDEPENDENCIES.Service)
    .to(FeatureService)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<FeatureController>(TYPESDEPENDENCIES.Controller)
    .to(FeatureController)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<FeatureUseCase>(TYPESDEPENDENCIES.UseCase)
    .to(FeatureUseCase)
    .inSingletonScope();
};

export default createDependencies;
