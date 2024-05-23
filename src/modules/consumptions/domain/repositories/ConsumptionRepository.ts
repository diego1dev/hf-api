import { IConsumption, IUpdateConsumption } from 'modules/consumptions/infrastructure/db/interfaces/IConsumption';
import { Consumption } from 'modules/consumptions/infrastructure/db/models';

export interface ConsumptionRepository {
  create(data:IConsumption): Promise<void>;
  getById(id: string): Promise<Consumption | null>;
  update(id: string, updatedConsumption: IUpdateConsumption): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Consumption[]>;
}

export default ConsumptionRepository;
