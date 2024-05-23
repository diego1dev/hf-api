import { IUser } from 'modules/users/infrastructure/db/interfaces/IUser';
import { HTTPMETHOD } from './ServerEnums';

export interface IEnpoint {
  method: HTTPMETHOD;
  url: string;
  event: CallableFunction;
  handler?: any;
  schema?: Record<string, any>;
}

export interface IReqData<T> {
  data:T,
  user:IUser
}
