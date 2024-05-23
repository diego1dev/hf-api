import { PartialWithKeysRequired } from 'modules/common/utils/Interfaces';
import { FeatureEntity } from '../entities';

export type IUpdateFeature = PartialWithKeysRequired<FeatureEntity, 'id'>;
export type IDeleteFeature = Pick<FeatureEntity, 'id'>;
export type IGetFeatureByID = Pick<FeatureEntity, 'id'>;
