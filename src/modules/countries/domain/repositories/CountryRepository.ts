import { ICountry, IUpdateCountry } from 'modules/countries/infrastructure/db/interfaces/ICountry';
import { Country } from 'modules/countries/infrastructure/db/models';

export interface CountryRepository {
  create(data:ICountry): Promise<void>;
  getById(id: string): Promise<Country | null>;
  update(id: string, updatedCountry: IUpdateCountry): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Country[]>;
}

export default CountryRepository;
