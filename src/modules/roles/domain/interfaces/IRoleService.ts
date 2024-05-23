import { IRole, IRoleID } from 'modules/roles/infrastructure/db/interfaces/IRole';

export interface IRoleService {
  validateRoles(roleIds: IRoleID[], rolesDb:IRole[]): void
}
