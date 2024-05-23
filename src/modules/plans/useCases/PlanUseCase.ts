import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { IFeatureService } from 'modules/features/domain/interfaces/IFeatureService';
import { TYPESDEPENDENCIES as TYPESDEP_FEATURES } from 'modules/features/dependencies/TypesDependencies';
import { UserEntity } from 'modules/users/domain/entities';
import { IPlan, IPlanID } from '../infrastructure/db/interfaces/IPlan';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { PlanRepository } from '../domain/repositories/PlanRepository';
import { IUpdatePlan } from '../domain/interfaces/IPlan';
import { PlanEntity, Permission } from '../domain/entities';

@injectable()
export class PlanUseCase {
  private repository = GLOBAL_CONTAINER.get<PlanRepository>(TYPESDEPENDENCIES.DBRepository);

  private featureService = GLOBAL_CONTAINER.get<IFeatureService>(TYPESDEP_FEATURES.Service);

  async create(data:PlanEntity, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.CREATE);

    await this.repository.create(data);
  }

  async getAll(logUser: UserEntity): Promise<IPlan[]> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);

    const result = await this.repository.getAll();
    return result;
  }

  async getById(id:IPlanID, logUser: UserEntity): Promise<IPlan | null> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);

    const result = await this.repository.getById(id);
    return result;
  }

  async update(data:IUpdatePlan, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.UPDATE);

    const { id, ...rest } = data;
    await this.repository.update(id, rest || {});
  }

  async delete(id:IPlanID, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.DELETE);

    await this.repository.delete(id);
  }
}
export default PlanUseCase;
