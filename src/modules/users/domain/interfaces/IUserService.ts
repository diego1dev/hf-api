export interface IUserService {
  generateId():string;
  hashPassword(password:string):Promise<string>;
}
