import { RoleEntity } from 'modules/roles/domain/entities';

export type IRole = RoleEntity;
export type IRoleID = IRole['id'];
export type IUpdateRole = Omit<Partial<IRole>, 'id'>;
