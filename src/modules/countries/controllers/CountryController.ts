import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { Result } from 'modules/common/utils/http';
import { IReqData } from 'modules/common/interfaces';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { CountryUseCase } from '../useCases';
import { CountryEntity } from '../domain/entities';
import { IDeleteCountry, IGetCountryByID, IUpdateCountry } from '../domain/interfaces/ICountry';

@injectable()
export class CountryController {
  private useCase = GLOBAL_CONTAINER.get<CountryUseCase>(TYPESDEPENDENCIES.UseCase);

  async create(inputData:IReqData<CountryEntity>) {
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

  async getById(inputData:IReqData<IGetCountryByID>) {
    try {
      const data = await this.useCase.getById(inputData.data.id, inputData.user);
      return Result.ok({ data, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async update(inputData:IReqData<IUpdateCountry>) {
    try {
      await this.useCase.update(inputData.data, inputData.user);
      return Result.ok({ data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }

  async delete(inputData:IReqData<IDeleteCountry>) {
    try {
      await this.useCase.delete(inputData.data.id, inputData.user);
      return Result.ok({ data: null, message: 'OK' });
    } catch (error) {
      return Result.failure(error);
    }
  }
}

export default CountryController;
