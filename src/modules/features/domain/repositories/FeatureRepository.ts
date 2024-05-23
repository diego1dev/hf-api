import { IFeature, IFeatureID, IUpdateFeature } from 'modules/features/infrastructure/db/interfaces/IFeature';
import { Feature } from 'modules/features/infrastructure/db/models';
import { FindOptions } from 'sequelize';

export interface FeatureRepository {
  create(data:IFeature): Promise<void>;
  getById(id: IFeatureID): Promise<Feature | null>;
  getByIds(roleIds: IFeatureID[], options?:FindOptions<IFeature>): Promise<Feature[]>;
  update(id: IFeatureID, updatedFeature: IUpdateFeature): Promise<void>;
  delete(id: IFeatureID): Promise<void>;
  getAll(): Promise<Feature[]>;
}

export default FeatureRepository;
