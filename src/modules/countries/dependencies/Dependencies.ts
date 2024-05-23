import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES } from './TypesDependencies';
import { CountryController } from '../controllers';
import { CountryUseCase } from '../useCases';
import { CountryDAO } from '../infrastructure/db/dao';
import { CountryRepository } from '../domain/repositories/CountryRepository';
import { TypeCountryModel, Country } from '../infrastructure/db/models/Country';
import { ICountryService } from '../domain/interfaces/ICountryService';
import { CountryService } from '../domain/services/CountryService';

export const createDependencies = (): void => {
  GLOBAL_CONTAINER.bind<TypeCountryModel>(TYPESDEPENDENCIES.Model).toConstantValue(Country);
  GLOBAL_CONTAINER.bind<CountryRepository>(TYPESDEPENDENCIES.DBRepository)
    .to(CountryDAO)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<ICountryService>(TYPESDEPENDENCIES.Service)
    .to(CountryService)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<CountryController>(TYPESDEPENDENCIES.Controller)
    .to(CountryController)
    .inSingletonScope();
  GLOBAL_CONTAINER.bind<CountryUseCase>(TYPESDEPENDENCIES.UseCase)
    .to(CountryUseCase)
    .inSingletonScope();
};

export default createDependencies;
