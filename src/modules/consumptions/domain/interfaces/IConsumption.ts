import { PartialWithKeysRequired } from 'modules/common/utils/Interfaces';
import { ConsumptionEntity } from '../entities';

export type IUpdateConsumption = PartialWithKeysRequired<ConsumptionEntity, 'id'>;
export type IDeleteConsumption = Pick<ConsumptionEntity, 'id'>;
export type IGetConsumptionByID = Pick<ConsumptionEntity, 'id'>;
