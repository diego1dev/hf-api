import { PartialWithKeysRequired } from 'modules/common/utils/Interfaces';
import { RoleEntity } from 'modules/roles/domain/entities';
import { PlanStatusEntity } from 'modules/planStatuses/domain/entities';
import { IUserPlan } from 'modules/users/infrastructure/db/interfaces/IUserPlan';
import { ConsumptionEntity } from 'modules/consumptions/domain/entities';
import { CountryEntity } from 'modules/countries/domain/entities';
import { PlanEntity } from 'modules/plans/domain/entities';
import { UserEntity } from '../entities';

export type IUpdateUser = PartialWithKeysRequired<UserEntity, 'id'>;
export type IDeleteUser = Pick<UserEntity, 'id'>;
export type IGetUserByID = Pick<UserEntity, 'id'>;
export type IRoleAssign = Pick<UserEntity, 'id'> & {
  rolesToAdd:RoleEntity['id'][];
  rolesToRemove:RoleEntity['id'][];
};
export type IFeatureAssign = Pick<UserEntity, 'id'> & {
  featuresToAdd:RoleEntity['id'][];
  featuresToRemove:RoleEntity['id'][];
};

export type IPlansByUser = {
  status:PlanStatusEntity['name'];
  dateStart:IUserPlan['dateStart'];
  dateEnd:IUserPlan['dateEnd'];
  consumption:Pick<ConsumptionEntity, 'total'> | null;
  flag:CountryEntity['url_flag'];
  country:CountryEntity['name'];
  plan:PlanEntity['name']
};
