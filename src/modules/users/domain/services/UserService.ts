/* eslint-disable class-methods-use-this */
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import { IUserService } from '../interfaces/IUserService';

const iterationsHash = 10;

@injectable()
export class UserService implements IUserService {
  generateId():string {
    return uuidv4();
  }

  hashPassword(password:string):Promise<string> {
    return bcrypt.hash(password, iterationsHash);
  }
}
export default UserService;
