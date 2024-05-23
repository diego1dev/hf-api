import { IJWT } from '../entities/IJWT';

export interface IAuthService {
  isValidPassword(password:string, passwordHash:string): Promise<boolean>;
  generateJWT (jwtData: IJWT): string;
}
