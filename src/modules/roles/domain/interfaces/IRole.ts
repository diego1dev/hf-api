import { PartialWithKeysRequired } from 'modules/common/utils/Interfaces';
import { FeatureEntity } from 'modules/features/domain/entities';
import { RoleEntity } from '../entities';

export type IUpdateRole = PartialWithKeysRequired<RoleEntity, 'id'>;
export type IDeleteRole = Pick<RoleEntity, 'id'>;
export type IGetRoleByID = Pick<RoleEntity, 'id'>;
export type IFeatureAssign = Pick<RoleEntity, 'id'> & {
  featuresToAdd:FeatureEntity['id'][];
  featuresToRemove:FeatureEntity['id'][];
};
