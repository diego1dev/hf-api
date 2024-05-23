import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { IFeatureService } from 'modules/features/domain/interfaces/IFeatureService';
import { TYPESDEPENDENCIES as TYPESDEP_FEATURES } from 'modules/features/dependencies/TypesDependencies';
import { UserEntity } from 'modules/users/domain/entities';
import { IPlanStatus, IPlanStatusID } from '../infrastructure/db/interfaces/IPlanStatus';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { PlanStatusRepository } from '../domain/repositories/PlanStatusRepository';
import { IUpdatePlanStatus } from '../domain/interfaces/IPlanStatus';
import { PlanStatusEntity, Permission } from '../domain/entities';

@injectable()
export class PlanStatusUseCase {
  private repository = GLOBAL_CONTAINER.get<PlanStatusRepository>(TYPESDEPENDENCIES.DBRepository);

  private featureService = GLOBAL_CONTAINER.get<IFeatureService>(TYPESDEP_FEATURES.Service);

  async create(data:PlanStatusEntity, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.CREATE);

    await this.repository.create(data);
  }

  async getAll(logUser: UserEntity): Promise<IPlanStatus[]> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);

    const result = await this.repository.getAll();
    return result;
  }

  async getById(id:IPlanStatusID, logUser: UserEntity): Promise<IPlanStatus | null> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);

    const result = await this.repository.getById(id);
    return result;
  }

  async update(data:IUpdatePlanStatus, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.UPDATE);

    const { id, ...rest } = data;
    await this.repository.update(id, rest || {});
  }

  async delete(id:IPlanStatusID, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.DELETE);

    await this.repository.delete(id);
  }
}
export default PlanStatusUseCase;
