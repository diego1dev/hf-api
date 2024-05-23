import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { IFeatureService } from 'modules/features/domain/interfaces/IFeatureService';
import { TYPESDEPENDENCIES as TYPESDEP_FEATURES } from 'modules/features/dependencies/TypesDependencies';
import { UserEntity } from 'modules/users/domain/entities';
import { IConsumption, IConsumptionID } from '../infrastructure/db/interfaces/IConsumption';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { ConsumptionRepository } from '../domain/repositories/ConsumptionRepository';
import { IUpdateConsumption } from '../domain/interfaces/IConsumption';
import { ConsumptionEntity, Permission } from '../domain/entities';

@injectable()
export class ConsumptionUseCase {
  private repository = GLOBAL_CONTAINER.get<ConsumptionRepository>(TYPESDEPENDENCIES.DBRepository);

  private featureService = GLOBAL_CONTAINER.get<IFeatureService>(TYPESDEP_FEATURES.Service);

  async create(data:ConsumptionEntity, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.CREATE);

    await this.repository.create(data);
  }

  async getAll(logUser: UserEntity): Promise<IConsumption[]> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);

    const result = await this.repository.getAll();
    return result;
  }

  async getById(id:IConsumptionID, logUser: UserEntity): Promise<IConsumption | null> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);

    const result = await this.repository.getById(id);
    return result;
  }

  async update(data:IUpdateConsumption, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.UPDATE);

    const { id, ...rest } = data;
    await this.repository.update(id, rest || {});
  }

  async delete(id:IConsumptionID, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.DELETE);

    await this.repository.delete(id);
  }
}
export default ConsumptionUseCase;
