import { FeatureEntity } from 'modules/features/domain/entities';

export interface RoleEntity {
  id:number;
  name:string
  description:string | null;
  Features?:FeatureEntity[]
}
