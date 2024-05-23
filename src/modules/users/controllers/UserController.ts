import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { Result } from 'modules/common/utils/http';
import { IReqData } from 'modules/common/interfaces';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { UserUseCase } from '../useCases';
import { UserEntity } from '../domain/entities';
import {
  IDeleteUser, IFeatureAssign, IGetUserByID, IRoleAssign, IUpdateUser,
} from '../domain/interfaces/IUser';

@injectable()
export class UserController {
  private useCase = GLOBAL_CONTAINER.get<UserUseCase>(TYPESDEPENDENCIES.UseCase);

  async create(inputData:IReqData<UserEntity>) {
    try {
      const data = await this.useCase.create(inputData.data);
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

  async getById(inputData:IReqData<IGetUserByID>) {
    try {
      const data = await this.useCase.getById(inputData.data.id, inputData.user);
      return Result.ok({ data, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async update(inputData:IReqData<IUpdateUser>) {
    try {
      await this.useCase.update(inputData.data, inputData.user);
      return Result.ok({ data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async delete(inputData:IReqData<IDeleteUser>) {
    try {
      await this.useCase.delete(inputData.data.id, inputData.user);
      return Result.ok({ data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async roleAssignments(inputData:IReqData<IRoleAssign>) {
    try {
      await this.useCase.roleAssignments(inputData.data, inputData.user);
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

export default UserController;
