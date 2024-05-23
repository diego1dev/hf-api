import { injectable } from 'inversify';
import { IExampleService } from '../interfaces/IExampleService';

@injectable()
export class ExampleService implements IExampleService {
}
export default ExampleService;
