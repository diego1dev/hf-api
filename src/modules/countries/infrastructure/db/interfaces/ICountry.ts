import { CountryEntity } from 'modules/countries/domain/entities';

export type ICountry = CountryEntity;
export type IUpdateCountry = Omit<Partial<ICountry>, 'id'>;
export type ICountryID = ICountry['id'];
