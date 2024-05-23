import { UserEntity } from 'modules/users/domain/entities';

export type IJWT = Pick<UserEntity, 'email' | 'id' | 'name'>;

export default IJWT;
