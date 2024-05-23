import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { TYPESDEPENDENCIES as TYPESDEP_FEATURES } from 'modules/features/dependencies/TypesDependencies';
import { sequelize } from 'modules/common/infrastructure/db';
import { getUniquePair } from 'modules/common/utils/uniqExcluding';
import FeatureRepository from 'modules/features/domain/repositories/FeatureRepository';
import { IFeatureService } from 'modules/features/domain/interfaces/IFeatureService';
import { UserEntity } from 'modules/users/domain/entities';
import { Permission as PermissionFeatures } from 'modules/features/domain/entities';
import { IRole, IRoleID } from '../infrastructure/db/interfaces/IRole';
import { TYPESDEPENDENCIES } from '../dependencies/TypesDependencies';
import { RoleRepository } from '../domain/repositories/RoleRepository';
import { IFeatureAssign, IUpdateRole } from '../domain/interfaces/IRole';
import { Permission, RoleEntity } from '../domain/entities';

@injectable()
export class RoleUseCase {
  private repository = GLOBAL_CONTAINER.get<RoleRepository>(TYPESDEPENDENCIES.DBRepository);

  private FeaturesRepo = GLOBAL_CONTAINER.get<FeatureRepository>(TYPESDEP_FEATURES.DBRepository);

  private featureService = GLOBAL_CONTAINER.get<IFeatureService>(TYPESDEP_FEATURES.Service);

  async create(data:RoleEntity, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.CREATE);
    await this.repository.create(data);
  }

  async getAll(logUser: UserEntity): Promise<IRole[]> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);
    const result = await this.repository.getAll();
    return result;
  }

  async getById(id:IRoleID, logUser: UserEntity): Promise<IRole | null> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.READ);
    const result = await this.repository.getById(id);
    return result;
  }

  async update(data:IUpdateRole, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.UPDATE);
    const { id, ...rest } = data;
    await this.repository.update(id, rest || {});
  }

  async delete(id:IRoleID, logUser: UserEntity): Promise<void> {
    this.featureService.hasFeatureAccessThrowError(logUser, Permission.DELETE);
    await this.repository.delete(id);
  }

  async featureAssignments(inputData:IFeatureAssign, logUser: UserEntity) {
    this.featureService.hasFeatureAccessThrowError(logUser, PermissionFeatures.ASIGN);
    const { id: roleId, featuresToAdd, featuresToRemove } = inputData;
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const [featToAddUniq, featToRemoveUniq] = getUniquePair(featuresToAdd, featuresToRemove);
      if (!featToAddUniq.length && !featToRemoveUniq.length) throw new Error('No se encontraron features');

      const role = await this.repository.getById(roleId, { transaction });
      if (!role) {
        throw new Error('Role no encontrado.');
      }

      // Obtener features a agregar y quitar en una sola consulta
      const featuresToAddDb = await this.FeaturesRepo.getByIds(featToAddUniq, { transaction });
      this.featureService.validateFeatures(featToAddUniq, featuresToAddDb);

      const featToRemoveDb = await this.FeaturesRepo.getByIds(featToRemoveUniq, { transaction });
      this.featureService.validateFeatures(featToRemoveUniq, featToRemoveDb);

      // Quitar features en un lote
      if (featToRemoveDb.length) {
        await role.removeFeatures(featToRemoveUniq, { transaction });
      }

      // Agregar features en un lote
      if (featuresToAddDb.length) {
        await role.addFeatures(featToAddUniq, { transaction });
      }

      await transaction.commit();

      return { message: 'Asignación de features modificada exitosamente.' };
    } catch (error) {
      if (transaction) await transaction.rollback();
      throw error;
    }
  }
}
export default RoleUseCase;
