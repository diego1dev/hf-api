import { UserEntity } from 'modules/users/domain/entities';

export type IUser = UserEntity;
export type IUpdateUser = Omit<Partial<IUser>, 'id'>;
export type IUserID = IUser['id'];
