import { IUser } from 'modules/users/infrastructure/db/interfaces/IUser';
import { IJWT } from '../entities/IJWT';

export interface IJWTAdapter {
  userToJWT(user:IUser):IJWT;
}
