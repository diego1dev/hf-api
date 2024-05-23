import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { Result } from 'modules/common/utils/http';
import { IReqData } from 'modules/common/interfaces';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { PlanUseCase } from '../useCases';
import { PlanEntity } from '../domain/entities';
import { IDeletePlan, IGetPlanByID, IUpdatePlan } from '../domain/interfaces/IPlan';

@injectable()
export class PlanController {
  private useCase = GLOBAL_CONTAINER.get<PlanUseCase>(TYPESDEPENDENCIES.UseCase);

  async create(inputData:IReqData<PlanEntity>) {
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

  async getById(inputData:IReqData<IGetPlanByID>) {
    try {
      const data = await this.useCase.getById(inputData.data.id, inputData.user);
      return Result.ok({ data, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async update(inputData:IReqData<IUpdatePlan>) {
    try {
      await this.useCase.update(inputData.data, inputData.user);
      return Result.ok({ data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async delete(inputData:IReqData<IDeletePlan>) {
    try {
      await this.useCase.delete(inputData.data.id, inputData.user);
      return Result.ok({ data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }
}

export default PlanController;
