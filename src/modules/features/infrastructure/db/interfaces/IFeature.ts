import { FeatureEntity } from 'modules/features/domain/entities';

export type IFeature = FeatureEntity;
export type IFeatureID = IFeature['id'];
export type IUpdateFeature = Omit<Partial<IFeature>, 'id'>;
