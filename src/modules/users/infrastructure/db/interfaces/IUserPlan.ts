import { ConsumptionEntity } from 'modules/consumptions/domain/entities';
import { CountryEntity } from 'modules/countries/domain/entities';
import { PlanStatusEntity } from 'modules/planStatuses/domain/entities';
import { PlanEntity } from 'modules/plans/domain/entities';

export interface IUserPlan {
  UserId:string;
  PlanId:string;
  ConsumptionId:string;
  CountryId:number;
  StatusId:number;
  dateStart:string;
  dateEnd:string;
  Consumption?:ConsumptionEntity;
  Country?:CountryEntity;
  PlanStatus?:PlanStatusEntity;
  Plan?:PlanEntity;
}
