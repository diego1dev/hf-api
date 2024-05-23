import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { IFeatureService } from 'modules/features/domain/interfaces/IFeatureService';
import { TYPESDEPENDENCIES as TYPESDEP_FEATURES } from 'modules/features/dependencies/TypesDependencies';
import { UserEntity } from 'modules/users/domain/entities';
import { IExample, IExampleID } from '../infrastructure/db/interfaces/IExample';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { ExampleRepository } from '../domain/repositories/ExampleRepository';
import { IUpdateExample } from '../domain/interfaces/IExample';
import { ExampleEntity, Permission } from '../domain/entities';

@injectable()
export class ExampleUseCase {
  private repository = GLOBAL_CONTAINER.get<ExampleRepository>(TYPESDEPENDENCIES.DBRepository);

  private featureService = GLOBAL_CONTAINER.get<IFeatureService>(TYPESDEP_FEATURES.Service);

  async create(data:ExampleEntity, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.CREATE);

    await this.repository.create(data);
  }

  async getAll(logUser: UserEntity): Promise<IExample[]> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);

    const result = await this.repository.getAll();
    return result;
  }

  async getById(id:IExampleID, logUser: UserEntity): Promise<IExample | null> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);

    const result = await this.repository.getById(id);
    return result;
  }

  async update(data:IUpdateExample, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.UPDATE);

    const { id, ...rest } = data;
    await this.repository.update(id, rest || {});
  }

  async delete(id:IExampleID, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.DELETE);

    await this.repository.delete(id);
  }
}
export default ExampleUseCase;
