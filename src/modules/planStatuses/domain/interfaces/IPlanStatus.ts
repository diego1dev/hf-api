import { PartialWithKeysRequired } from 'modules/common/utils/Interfaces';
import { PlanStatusEntity } from '../entities';

export type IUpdatePlanStatus = PartialWithKeysRequired<PlanStatusEntity, 'id'>;
export type IDeletePlanStatus = Pick<PlanStatusEntity, 'id'>;
export type IGetPlanStatusByID = Pick<PlanStatusEntity, 'id'>;
