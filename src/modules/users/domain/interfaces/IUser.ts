import { PartialWithKeysRequired } from 'modules/common/utils/Interfaces';
import { RoleEntity } from 'modules/roles/domain/entities';
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
