/* eslint-disable class-methods-use-this */
import { injectable } from 'inversify';
import { IRole, IRoleID } from 'modules/roles/infrastructure/db/interfaces/IRole';
import { IRoleService } from '../interfaces/IRoleService';

@injectable()
export class RoleService implements IRoleService {
  validateRoles(roleIds: IRoleID[], rolesDb:IRole[]): void {
    if (roleIds.length !== rolesDb.length) {
      throw new Error('No se encontraron todos los roles');
    }
  }
}
export default RoleService;
