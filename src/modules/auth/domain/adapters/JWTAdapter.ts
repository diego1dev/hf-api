/* eslint-disable class-methods-use-this */
import { IUser } from 'modules/users/infrastructure/db/interfaces/IUser';
import { injectable } from 'inversify';
import { IJWT } from '../entities/IJWT';
import { IJWTAdapter } from '../interfaces/IJWTAdapter';

@injectable()
export class JWTAdapter implements IJWTAdapter {
  userToJWT(user:IUser):IJWT {
    return {
      email: user.email,
      id: user.id,
      name: user.name,
    };
  }
}
export default JWTAdapter;
