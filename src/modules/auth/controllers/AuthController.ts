/* eslint-disable class-methods-use-this */
import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { Result } from 'modules/common/utils/http';
import { IReqData } from 'modules/common/interfaces';
import { UserEntity } from 'modules/users/domain/entities';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { AuthUseCase } from '../useCases';

@injectable()
export class AuthController {
  private useCase = GLOBAL_CONTAINER.get<AuthUseCase>(TYPESDEPENDENCIES.UseCase);

  async registerLocal(data:IReqData<UserEntity>) {
    try {
      const token = await this.useCase.registerLocal(data.data);
      return Result.ok({ token, data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async loginLocal(inputData: IReqData<void>) {
    try {
      const token = await this.useCase.loginLocal(inputData.user);
      return Result.ok({ token, data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async loginGoogle(data:IReqData<void>) {
    try {
      return Result.ok({ data, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }
}

export default AuthController;
