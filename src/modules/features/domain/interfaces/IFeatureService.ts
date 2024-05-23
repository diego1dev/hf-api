import { IFeature, IFeatureID } from 'modules/features/infrastructure/db/interfaces/IFeature';
import { UserEntity } from 'modules/users/domain/entities';

export interface IFeatureService {
  validateFeatures(featureIds: IFeatureID[], featuresDb:IFeature[]): void;
  hasFeatureAccess(user:UserEntity, feature:string):boolean;
  hasFeatureAccessThrowError(user:UserEntity, feature:string):void;
}
