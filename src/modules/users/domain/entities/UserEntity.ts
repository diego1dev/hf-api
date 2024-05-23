import { FeatureEntity } from 'modules/features/domain/entities';
import { RoleEntity } from 'modules/roles/domain/entities';

export interface UserEntity {
  id:string;
  email:string;
  password:string;
  name:string;
  Features?:FeatureEntity[];
  Roles?:RoleEntity[]
}
