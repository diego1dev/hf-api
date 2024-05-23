import { injectable } from 'inversify';
import { ICountryService } from '../interfaces/ICountryService';

@injectable()
export class CountryService implements ICountryService {
}
export default CountryService;
