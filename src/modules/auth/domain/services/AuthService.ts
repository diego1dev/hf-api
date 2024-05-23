/* eslint-disable class-methods-use-this */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { injectable } from 'inversify';
import { ENV } from 'modules/common/utils/env';
import { IAuthService } from '../interfaces/IAuthService';
import { IJWT } from '../entities/IJWT';

@injectable()
export class AuthService implements IAuthService {
  isValidPassword(password:string, passwordHash:string):Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  generateJWT(jwtData: IJWT): string {
    const secretKey = ENV.JWT_SECRET;
    const expiresIn = ENV.EXPIRE_TOKEN;
    const token = jwt.sign(jwtData, secretKey, { expiresIn });
    return token;
  }
}
export default AuthService;
