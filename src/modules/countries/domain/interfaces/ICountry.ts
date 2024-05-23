import { PartialWithKeysRequired } from 'modules/common/utils/Interfaces';
import { CountryEntity } from '../entities';

export type IUpdateCountry = PartialWithKeysRequired<CountryEntity, 'id'>;
export type IDeleteCountry = Pick<CountryEntity, 'id'>;
export type IGetCountryByID = Pick<CountryEntity, 'id'>;
