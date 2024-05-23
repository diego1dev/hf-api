import { IPlan, IUpdatePlan } from 'modules/plans/infrastructure/db/interfaces/IPlan';
import { Plan } from 'modules/plans/infrastructure/db/models';

export interface PlanRepository {
  create(data:IPlan): Promise<void>;
  getById(id: string): Promise<Plan | null>;
  update(id: string, updatedPlan: IUpdatePlan): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<Plan[]>;
}

export default PlanRepository;
