import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { UserRepository } from 'modules/users/domain/repositories/UserRepository';
import { TYPESDEPENDENCIES } from 'modules/users/dependencies/TypesDependencies';
import { FindOptions } from 'sequelize';
import { Feature } from 'modules/features/infrastructure/db/models';
import { Role } from 'modules/roles/infrastructure/db/models';
import { TypeUserModel, User } from '../models';
import { IUpdateUser, IUser, IUserID } from '../interfaces/IUser';

@injectable()
export class UserDAO implements UserRepository {
  private dbModel = GLOBAL_CONTAINER.get<TypeUserModel>(TYPESDEPENDENCIES.Model);

  async create(data:IUser): Promise<void> {
    await this.dbModel.create(data);
  }

  async getById(id: IUserID, options?:Omit<FindOptions<IUser>, 'where'>): Promise<User | null> {
    return this.dbModel.findByPk(id, options);
  }

  async getByIdComplete(id: IUserID): Promise<User | null> {
    return this.dbModel.findByPk(id, {
      include: [Feature, { model: Role, include: [Feature] }],
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.dbModel.findOne({ where: { email } });
  }

  async getAll(): Promise<User[]> {
    return this.dbModel.findAll();
  }

  async update(id: IUserID, updatedUser: IUpdateUser): Promise<void> {
    // respuesta en la posicion 0 [1 o 0] se puede validar si se actualizó
    await this.dbModel.update(updatedUser, { where: { id } });
  }

  async delete(id: IUserID): Promise<void> {
    // respuesta 1 o 0 para validar que borró
    await this.dbModel.destroy({ where: { id } });
  }
}

export default UserDAO;
