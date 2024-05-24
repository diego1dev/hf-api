import { IExample, IUpdateExample, IExampleID } from 'modules/examples/infrastructure/db/interfaces/IExample';
import { Example } from 'modules/examples/infrastructure/db/models';

export interface ExampleRepository {
  create(data:IExample): Promise<void>;
  getById(id: IExampleID): Promise<Example | null>;
  update(id: IExampleID, updatedExample: IUpdateExample): Promise<void>;
  delete(id: IExampleID): Promise<void>;
  getAll(): Promise<Example[]>;
}

export default ExampleRepository;
