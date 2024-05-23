import { IRole, IRoleID, IUpdateRole } from 'modules/roles/infrastructure/db/interfaces/IRole';
import { Role } from 'modules/roles/infrastructure/db/models';
import { FindOptions } from 'sequelize';

export interface RoleRepository {
  create(data:IRole): Promise<void>;
  getById(id: IRoleID, options?:Omit<FindOptions<IRole>, 'where'>): Promise<Role | null>;
  getByIds(roleIds: IRoleID[], options?:FindOptions<IRole>): Promise<Role[]>;
  update(id: IRoleID, updatedRole: IUpdateRole): Promise<void>;
  delete(id: IRoleID): Promise<void>;
  getAll(): Promise<Role[]>;
}

export default RoleRepository;
