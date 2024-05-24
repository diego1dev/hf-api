import { IUpdateUser, IUser } from 'modules/users/infrastructure/db/interfaces/IUser';
import { User } from 'modules/users/infrastructure/db/models';
import UserPlan from 'modules/users/infrastructure/db/models/UserPlan';
import { FindOptions } from 'sequelize';

export interface UserRepository {
  create(data:IUser): Promise<void>;
  getById(id: string, options?:Omit<FindOptions<IUser>, 'where'>): Promise<User | null>;
  getPlans(id: string): Promise<UserPlan[]>;
  getByIdComplete(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  update(id: string, updatedUser: IUpdateUser): Promise<void>;
  delete(id: string): Promise<void>;
  getAll(): Promise<User[]>;
}

export default UserRepository;
