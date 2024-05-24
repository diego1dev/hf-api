import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES as TYPESDEPENDENCIES_ROLES } from 'modules/roles/dependencies/TypesDependencies';
import { TYPESDEPENDENCIES as TYPESDEP_FEATURES } from 'modules/features/dependencies/TypesDependencies';
import { RoleRepository } from 'modules/roles/domain/repositories/RoleRepository';
import { sequelize } from 'modules/common/infrastructure/db';
import { IRoleService } from 'modules/roles/domain/interfaces/IRoleService';
import { getUniquePair } from 'modules/common/utils/uniqExcluding';
import FeatureRepository from 'modules/features/domain/repositories/FeatureRepository';
import { IFeatureService } from 'modules/features/domain/interfaces/IFeatureService';
import { Permission as PermissionFeatures } from 'modules/features/domain/entities';
import { Permission as PermissionRoles } from 'modules/roles/domain/entities';
import { IUser, IUserID } from '../infrastructure/db/interfaces/IUser';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { UserRepository } from '../domain/repositories/UserRepository';
import { IUserService } from '../domain/interfaces/IUserService';
import { IFeatureAssign, IRoleAssign, IUpdateUser } from '../domain/interfaces/IUser';
import { Permission, UserEntity } from '../domain/entities';
import UserPlan from '../infrastructure/db/models/UserPlan';

@injectable()
export class UserUseCase {
  private repository = GLOBAL_CONTAINER.get<UserRepository>(TYPESDEPENDENCIES.DBRepository);

  private RolesRepo = GLOBAL_CONTAINER.get<RoleRepository>(TYPESDEPENDENCIES_ROLES.DBRepository);

  private roleService = GLOBAL_CONTAINER.get<IRoleService>(TYPESDEPENDENCIES_ROLES.Service);

  private userService = GLOBAL_CONTAINER.get<IUserService>(TYPESDEPENDENCIES.Service);

  private FeaturesRepo = GLOBAL_CONTAINER.get<FeatureRepository>(TYPESDEP_FEATURES.DBRepository);

  private featureService = GLOBAL_CONTAINER.get<IFeatureService>(TYPESDEP_FEATURES.Service);

  async create(data: UserEntity): Promise<IUser> {
    const { password } = data;
    const id = this.userService.generateId();
    const hashedPassword = await this.userService.hashPassword(password);
    const registerUser = { ...data, password: hashedPassword, id };
    await this.repository.create(registerUser);
    return registerUser;
  }

  async getAll(logUser: UserEntity): Promise<IUser[]> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);
    const result = await this.repository.getAll();
    return result;
  }

  async getPlans(id: IUserID, logUser: UserEntity): Promise<UserPlan[]> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);
    const result = await this.repository.getPlans(id);
    return result;
  }

  async getById(id: IUserID, logUser: UserEntity): Promise<IUser | null> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);
    const result = await this.repository.getById(id);
    return result;
  }

  async update(data: IUpdateUser, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.UPDATE);
    const { id, ...rest } = data;
    if (rest.password) {
      rest.password = await this.userService.hashPassword(rest.password);
    }
    await this.repository.update(id, rest || {});
  }

  async delete(id: IUserID, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.DELETE);
    await this.repository.delete(id);
  }

  async roleAssignments(inputData: IRoleAssign, logUser: UserEntity) {
    this.featureService.hasFeatureAccessThrowError(logUser, PermissionRoles.ASIGN);
    const { id: userId, rolesToAdd, rolesToRemove } = inputData;
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const [rolesToAddUniq, rolesToRemoveUniq] = getUniquePair(rolesToAdd, rolesToRemove);
      if (!rolesToAddUniq.length && !rolesToRemoveUniq.length) throw new Error('No se encontraron roles');

      const user = await this.repository.getById(userId, { transaction });
      if (!user) {
        throw new Error('Usuario no encontrado.');
      }

      // WARNING se va a seguir consultando la data para luego hacer validaciones mas grandes
      // Obtener roles a agregar y quitar en una sola consulta
      const rolesToAddDb = await this.RolesRepo.getByIds(rolesToAddUniq, { transaction });
      this.roleService.validateRoles(rolesToAddUniq, rolesToAddDb);

      const rolesToRemoveDb = await this.RolesRepo.getByIds(rolesToRemoveUniq, { transaction });
      this.roleService.validateRoles(rolesToRemoveUniq, rolesToRemoveDb);

      // Quitar roles en un lote
      if (rolesToRemoveDb.length) {
        await user.removeRoles(rolesToRemoveUniq, { transaction });
      }

      // Agregar roles en un lote
      if (rolesToAddDb.length) {
        await user.addRoles(rolesToAddUniq, { transaction });
      }

      await transaction.commit();

      return { message: 'Asignación de roles modificada exitosamente.' };
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }

  async featureAssignments(inputData: IFeatureAssign, logUser: UserEntity) {
    this.featureService.hasFeatureAccessThrowError(logUser, PermissionFeatures.ASIGN);
    const { id: userId, featuresToAdd, featuresToRemove } = inputData;
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const [featToAddUniq, featToRemoveUniq] = getUniquePair(featuresToAdd, featuresToRemove);
      if (!featToAddUniq.length && !featToRemoveUniq.length) throw new Error('No se encontraron features');

      const user = await this.repository.getById(userId, { transaction });
      if (!user) {
        throw new Error('Usuario no encontrado.');
      }

      // WARNING se va a seguir consultando la data para luego hacer validaciones mas grandes
      // Obtener features a agregar y quitar en una sola consulta
      const featuresToAddDb = await this.FeaturesRepo.getByIds(featToAddUniq, { transaction });
      this.featureService.validateFeatures(featToAddUniq, featuresToAddDb);

      const featToRemoveDb = await this.FeaturesRepo.getByIds(featToRemoveUniq, { transaction });
      this.featureService.validateFeatures(featToRemoveUniq, featToRemoveDb);

      // Quitar features en un lote
      if (featToRemoveDb.length) {
        await user.removeFeatures(featToRemoveUniq, { transaction });
      }

      // Agregar features en un lote
      if (featuresToAddDb.length) {
        await user.addFeatures(featToAddUniq, { transaction });
      }

      await transaction.commit();

      return { message: 'Asignación de features modificada exitosamente.' };
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
}
export default UserUseCase;
