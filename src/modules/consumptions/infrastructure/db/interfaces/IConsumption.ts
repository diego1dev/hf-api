import { ConsumptionEntity } from 'modules/consumptions/domain/entities';

export type IConsumption = ConsumptionEntity;
export type IUpdateConsumption = Omit<Partial<IConsumption>, 'id'>;
export type IConsumptionID = IConsumption['id'];
