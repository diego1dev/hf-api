import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { RoleRepository } from 'modules/roles/domain/repositories/RoleRepository';
import { TYPESDEPENDENCIES } from 'modules/roles/dependencies/TypesDependencies';
import { FindOptions } from 'sequelize';
import { Role, TypeRoleModel } from '../models';
import { IUpdateRole, IRole, IRoleID } from '../interfaces/IRole';

@injectable()
export class RoleDAO implements RoleRepository {
  private dbModel = GLOBAL_CONTAINER.get<TypeRoleModel>(TYPESDEPENDENCIES.Model);

  async create(data:IRole): Promise<void> {
    await this.dbModel.create(data);
  }

  async getById(id: IRoleID, options?:Omit<FindOptions<IRole>, 'where'>): Promise<Role | null> {
    return this.dbModel.findByPk(id, options);
  }

  async getByIds(roleIds: IRoleID[], options?:FindOptions<IRole>): Promise<Role[]> {
    return this.dbModel.findAll({
      ...options,
      where: { id: roleIds },
    });
  }

  async getAll(): Promise<Role[]> {
    return this.dbModel.findAll();
  }

  async update(id: IRoleID, updatedRole: IUpdateRole): Promise<void> {
    // respuesta en la posicion 0 [1 o 0] se puede validar si se actualizó
    await this.dbModel.update(updatedRole, { where: { id } });
  }

  async delete(id: IRoleID): Promise<void> {
    // respuesta 1 o 0 para validar que borró
    await this.dbModel.destroy({ where: { id } });
  }
}

export default RoleDAO;
