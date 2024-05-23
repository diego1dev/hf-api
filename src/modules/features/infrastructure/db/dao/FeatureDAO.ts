import { injectable } from 'inversify';
import { GLOBAL_CONTAINER } from 'modules/common/dependencies';
import { FeatureRepository } from 'modules/features/domain/repositories/FeatureRepository';
import { TYPESDEPENDENCIES } from 'modules/features/dependencies/TypesDependencies';
import { FindOptions } from 'sequelize';
import { Feature, TypeFeatureModel } from '../models';
import { IUpdateFeature, IFeature, IFeatureID } from '../interfaces/IFeature';

@injectable()
export class FeatureDAO implements FeatureRepository {
  private dbModel = GLOBAL_CONTAINER.get<TypeFeatureModel>(TYPESDEPENDENCIES.Model);

  async create(data:IFeature): Promise<void> {
    await this.dbModel.create(data);
  }

  async getById(id: IFeatureID): Promise<Feature | null> {
    return this.dbModel.findByPk(id);
  }

  async getByIds(featureIds: IFeatureID[], options?:FindOptions<IFeature>): Promise<Feature[]> {
    return this.dbModel.findAll({
      ...options,
      where: { id: featureIds },
    });
  }

  async getAll(): Promise<Feature[]> {
    return this.dbModel.findAll();
  }

  async update(id: IFeatureID, updatedFeature: IUpdateFeature): Promise<void> {
    // respuesta en la posicion 0 [1 o 0] se puede validar si se actualizó
    await this.dbModel.update(updatedFeature, { where: { id } });
  }

  async delete(id: IFeatureID): Promise<void> {
    // respuesta 1 o 0 para validar que borró
    await this.dbModel.destroy({ where: { id } });
  }
}

export default FeatureDAO;
