/* eslint-disable class-methods-use-this */
import { injectable } from 'inversify';
import { IUserPlan } from 'modules/users/infrastructure/db/interfaces/IUserPlan';
import { IUserPlansAdapter } from '../interfaces/IUserPlansAdapter';
import { IPlansByUser } from '../interfaces/IUser';

@injectable()
export class UserPlanAdapter implements IUserPlansAdapter {
  userPlansToPlansByUser(plans:IUserPlan[]):IPlansByUser[] {
    return plans.map((userPlan) => ({
      consumption: userPlan.Consumption ? { total: userPlan.Consumption?.total || 0 } : null,
      country: userPlan.Country?.name || '',
      dateEnd: userPlan.dateEnd,
      dateStart: userPlan.dateStart,
      flag: userPlan.Country?.url_flag || '',
      plan: userPlan.Plan?.name || '',
      status: userPlan.PlanStatus?.name || '',
    }));
  }
}
export default UserPlanAdapter;
