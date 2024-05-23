import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { CountryRepository } from 'modules/countries/domain/repositories/CountryRepository';
import { TYPESDEPENDENCIES } from 'modules/countries/dependencies/TypesDependencies';
import { Country } from 'modules/countries/infrastructure/db/models';
import { TypeCountryModel } from '../models';
import { IUpdateCountry, ICountry, ICountryID } from '../interfaces/ICountry';

@injectable()
export class CountryDAO implements CountryRepository {
  private dbModel = GLOBAL_CONTAINER.get<TypeCountryModel>(TYPESDEPENDENCIES.Model);

  async create(data:ICountry): Promise<void> {
    await this.dbModel.create(data);
  }

  async getById(id: ICountryID): Promise<Country | null> {
    return this.dbModel.findByPk(id);
  }

  async getAll(): Promise<Country[]> {
    return this.dbModel.findAll();
  }

  async update(id: ICountryID, updatedCountry: IUpdateCountry): Promise<void> {
    // respuesta en la posicion 0 [1 o 0] se puede validar si se actualizó
    await this.dbModel.update(updatedCountry, { where: { id } });
  }

  async delete(id: ICountryID): Promise<void> {
    // respuesta 1 o 0 para validar que borró
    await this.dbModel.destroy({ where: { id } });
  }
}

export default CountryDAO;
