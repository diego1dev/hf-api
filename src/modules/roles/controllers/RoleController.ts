import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { Result } from 'modules/common/utils/http';
import { IReqData } from 'modules/common/interfaces';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { RoleUseCase } from '../useCases';
import { RoleEntity } from '../domain/entities';
import {
  IDeleteRole, IFeatureAssign, IGetRoleByID, IUpdateRole,
} from '../domain/interfaces/IRole';

@injectable()
export class RoleController {
  private useCase = GLOBAL_CONTAINER.get<RoleUseCase>(TYPESDEPENDENCIES.UseCase);

  async create(inputData:IReqData<RoleEntity>) {
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

  async getById(inputData:IReqData<IGetRoleByID>) {
    try {
      const data = await this.useCase.getById(inputData.data.id, inputData.user);
      return Result.ok({ data, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async update(inputData:IReqData<IUpdateRole>) {
    try {
      await this.useCase.update(inputData.data, inputData.user);
      return Result.ok({ data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async delete(inputData:IReqData<IDeleteRole>) {
    try {
      await this.useCase.delete(inputData.data.id, inputData.user);
      return Result.ok({ data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async featureAssignments(inputData:IReqData<IFeatureAssign>) {
    try {
      await this.useCase.featureAssignments(inputData.data, inputData.user);
      return Result.ok({ data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }
}

export default RoleController;
