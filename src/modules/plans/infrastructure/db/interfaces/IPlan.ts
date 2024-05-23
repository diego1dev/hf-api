import { PlanEntity } from 'modules/plans/domain/entities';

export type IPlan = PlanEntity;
export type IUpdatePlan = Omit<Partial<IPlan>, 'id'>;
export type IPlanID = IPlan['id'];
