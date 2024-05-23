import { IPlanStatus, IUpdatePlanStatus } from 'modules/planStatuses/infrastructure/db/interfaces/IPlanStatus';
import { PlanStatus } from 'modules/planStatuses/infrastructure/db/models';

export interface PlanStatusRepository {
  create(data:IPlanStatus): Promise<void>;
  getById(id: string): Promise<PlanStatus | null>;
  update(id: string, updatedPlanStatus: IUpdatePlanStatus): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<PlanStatus[]>;
}

export default PlanStatusRepository;
