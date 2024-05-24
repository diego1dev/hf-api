import { ICountry, IUpdateCountry, ICountryID } from 'modules/countries/infrastructure/db/interfaces/ICountry';
import { Country } from 'modules/countries/infrastructure/db/models';

export interface CountryRepository {
  create(data:ICountry): Promise<void>;
  getById(id: ICountryID): Promise<Country | null>;
  update(id: ICountryID, updatedCountry: IUpdateCountry): Promise<void>;
  delete(id: ICountryID): Promise<void>;
  getAll(): Promise<Country[]>;
}

export default CountryRepository;
