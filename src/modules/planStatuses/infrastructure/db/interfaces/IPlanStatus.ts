import { PlanStatusEntity } from 'modules/planStatuses/domain/entities';

export type IPlanStatus = PlanStatusEntity;
export type IUpdatePlanStatus = Omit<Partial<IPlanStatus>, 'id'>;
export type IPlanStatusID = IPlanStatus['id'];
