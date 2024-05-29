/* eslint-disable class-methods-use-this */
import { injectable } from 'inversify';
import { IFeature, IFeatureID } from 'modules/features/infrastructure/db/interfaces/IFeature';
import { UserEntity } from 'modules/users/domain/entities';
import { SUPERUSER_ROLE_ID } from 'modules/roles/constants/reserved';
import { IFeatureService } from '../interfaces/IFeatureService';

@injectable()
export class FeatureService implements IFeatureService {
  validateFeatures(featureIds: IFeatureID[], featuresDb:IFeature[]): void {
    if (featureIds.length !== featuresDb.length) {
      throw new Error('No se encontraron todos los features');
    }
  }

  hasFeatureAccess(user:UserEntity, feature:string):boolean {
    console.log('user.Roles');
    console.log(user.Roles);
    console.log('---------');
    if (user.Roles?.some((role) => role.id === SUPERUSER_ROLE_ID)) return true;
    if ((user.Features || []).some((ft) => ft.name === feature)) return true;
    if ((user.Roles?.some((role) => role.Features?.some((ft) => ft.name === feature)))) return true;
    return false;
  }

  hasFeatureAccessThrowError(user:UserEntity, feature:string):void {
    if (!this.hasFeatureAccess(user, feature)) throw new Error('Usted no tiene permisos para realizar esta acción');
  }
}
export default FeatureService;
