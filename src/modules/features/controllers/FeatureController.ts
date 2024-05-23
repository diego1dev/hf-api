import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { Result } from 'modules/common/utils/http';
import { IReqData } from 'modules/common/interfaces';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { FeatureUseCase } from '../useCases';
import { FeatureEntity } from '../domain/entities';
import { IDeleteFeature, IGetFeatureByID, IUpdateFeature } from '../domain/interfaces/IFeature';

@injectable()
export class FeatureController {
  private useCase = GLOBAL_CONTAINER.get<FeatureUseCase>(TYPESDEPENDENCIES.UseCase);

  async create(inputData:IReqData<FeatureEntity>) {
    try {
      const data = await this.useCase.create(inputData.data, inputData.user);
      return Result.ok({ data, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async getAll(inputData:IReqData<undefined>) {
    try {
      const data = await this.useCase.getAll(inputData.user);
      return Result.ok({ data, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async getById(inputData:IReqData<IGetFeatureByID>) {
    try {
      const data = await this.useCase.getById(inputData.data.id, inputData.user);
      return Result.ok({ data, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async update(inputData:IReqData<IUpdateFeature>) {
    try {
      await this.useCase.update(inputData.data, inputData.user);
      return Result.ok({ data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async delete(inputData:IReqData<IDeleteFeature>) {
    try {
      await this.useCase.delete(inputData.data.id, inputData.user);
      return Result.ok({ data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }
}

export default FeatureController;
