import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { IFeatureService } from 'modules/features/domain/interfaces/IFeatureService';
import { TYPESDEPENDENCIES as TYPESDEP_FEATURES } from 'modules/features/dependencies/TypesDependencies';
import { UserEntity } from 'modules/users/domain/entities';
import { ICountry, ICountryID } from '../infrastructure/db/interfaces/ICountry';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { CountryRepository } from '../domain/repositories/CountryRepository';
import { IUpdateCountry } from '../domain/interfaces/ICountry';
import { CountryEntity, Permission } from '../domain/entities';

@injectable()
export class CountryUseCase {
  private repository = GLOBAL_CONTAINER.get<CountryRepository>(TYPESDEPENDENCIES.DBRepository);

  private featureService = GLOBAL_CONTAINER.get<IFeatureService>(TYPESDEP_FEATURES.Service);

  async create(data:CountryEntity, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.CREATE);

    await this.repository.create(data);
  }

  async getAll(logUser: UserEntity): Promise<ICountry[]> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);

    const result = await this.repository.getAll();
    return result;
  }

  async getById(id:ICountryID, logUser: UserEntity): Promise<ICountry | null> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);

    const result = await this.repository.getById(id);
    return result;
  }

  async update(data:IUpdateCountry, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.UPDATE);

    const { id, ...rest } = data;
    await this.repository.update(id, rest || {});
  }

  async delete(id:ICountryID, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.DELETE);

    await this.repository.delete(id);
  }
}
export default CountryUseCase;
