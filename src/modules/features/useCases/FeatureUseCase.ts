/* eslint-disable class-methods-use-this */
import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES as TYPESDEP_FEATURES } from 'modules/features/dependencies/TypesDependencies';
import { UserEntity } from 'modules/users/domain/entities';
import { IFeature, IFeatureID } from '../infrastructure/db/interfaces/IFeature';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { FeatureRepository } from '../domain/repositories/FeatureRepository';
import { IUpdateFeature } from '../domain/interfaces/IFeature';
import { FeatureEntity, Permission } from '../domain/entities';
import { IFeatureService } from '../domain/interfaces/IFeatureService';

@injectable()
export class FeatureUseCase {
  private repository = GLOBAL_CONTAINER.get<FeatureRepository>(TYPESDEPENDENCIES.DBRepository);

  private featureService = GLOBAL_CONTAINER.get<IFeatureService>(TYPESDEP_FEATURES.Service);

  async create(data:FeatureEntity, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.CREATE);
    await this.repository.create(data);
  }

  async getAll(logUser: UserEntity): Promise<IFeature[]> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);
    const result = await this.repository.getAll();
    return result;
  }

  async getById(id:IFeatureID, logUser: UserEntity): Promise<IFeature | null> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);
    const result = await this.repository.getById(id);
    return result;
  }

  async update(data:IUpdateFeature, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.UPDATE);

    const { id, ...rest } = data;
    await this.repository.update(id, rest || {});
  }

  async delete(id:IFeatureID, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.DELETE);

    await this.repository.delete(id);
  }
}
export default FeatureUseCase;
