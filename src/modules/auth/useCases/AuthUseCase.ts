import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES as USER_TYPESDEPENDENCIES } from 'modules/users/dependencies/TypesDependencies';
import { UserUseCase } from 'modules/users/useCases';
import { IUser } from 'modules/users/infrastructure/db/interfaces/IUser';
import { UserEntity } from 'modules/users/domain/entities';
import { TYPESDEPENDENCIES as AUTH_TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { IAuthService } from '../domain/interfaces/IAuthService';
import { IJWTAdapter } from '../domain/interfaces/IJWTAdapter';

@injectable()
export class AuthUseCase {
  private authService = GLOBAL_CONTAINER.get<IAuthService>(AUTH_TYPESDEPENDENCIES.Service);

  private jwtAdapter = GLOBAL_CONTAINER.get<IJWTAdapter>(AUTH_TYPESDEPENDENCIES.UserJWTAdapter);

  private userUseCase = GLOBAL_CONTAINER.get<UserUseCase>(USER_TYPESDEPENDENCIES.UseCase);

  async registerLocal(user:UserEntity): Promise<string> {
    const userCreated = await this.userUseCase.create(user);
    const dataAdapted = this.jwtAdapter.userToJWT(userCreated);
    const token = this.authService.generateJWT(dataAdapted);
    return token;
  }

  async loginLocal(authUser:IUser) {
    const dataAdapted = this.jwtAdapter.userToJWT(authUser);
    const token = this.authService.generateJWT(dataAdapted);
    return token;
  }
}
export default AuthUseCase;
