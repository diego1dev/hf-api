import { IUserPlan } from 'modules/users/infrastructure/db/interfaces/IUserPlan';
import { IPlansByUser } from './IUser';

export interface IUserPlansAdapter {
  userPlansToPlansByUser(user: IUserPlan[]): IPlansByUser[];
}
