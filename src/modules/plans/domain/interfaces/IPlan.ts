import { PartialWithKeysRequired } from 'modules/common/utils/Interfaces';
import { PlanEntity } from '../entities';

export type IUpdatePlan = PartialWithKeysRequired<PlanEntity, 'id'>;
export type IDeletePlan = Pick<PlanEntity, 'id'>;
export type IGetPlanByID = Pick<PlanEntity, 'id'>;
