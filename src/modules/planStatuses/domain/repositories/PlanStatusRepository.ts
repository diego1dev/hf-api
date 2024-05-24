import { IPlanStatus, IPlanStatusID, IUpdatePlanStatus } from 'modules/planStatuses/infrastructure/db/interfaces/IPlanStatus';
import { PlanStatus } from 'modules/planStatuses/infrastructure/db/models';

export interface PlanStatusRepository {
  create(data:IPlanStatus): Promise<void>;
  getById(id: IPlanStatusID): Promise<PlanStatus | null>;
  update(id: IPlanStatusID, updatedPlanStatus: IUpdatePlanStatus): Promise<void>;
  delete(id: IPlanStatusID): Promise<void>;
  getAll(): Promise<PlanStatus[]>;
}

export default PlanStatusRepository;
