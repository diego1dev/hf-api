import { IExample, IUpdateExample } from 'modules/examples/infrastructure/db/interfaces/IExample';
import { Example } from 'modules/examples/infrastructure/db/models';

export interface ExampleRepository {
  create(data:IExample): Promise<void>;
  getById(id: string): Promise<Example | null>;
  update(id: string, updatedExample: IUpdateExample): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Example[]>;
}

export default ExampleRepository;
