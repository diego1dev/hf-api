import { injectable } from 'inversify';
import {
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
  DataTypes,
  Model,
} from 'sequelize';
import { sequelize } from 'modules/common/infrastructure/db';
import { Feature } from 'modules/features/infrastructure/db/models';
import { IFeatureID } from 'modules/features/infrastructure/db/interfaces/IFeature';
import { IRole } from '../interfaces/IRole';

@injectable()
export class Role extends Model<IRole, IRole> implements IRole {
  public id!: number;

  public name!: string;

  public description!: string;

  public addFeatures!: BelongsToManyAddAssociationsMixin<Feature, IFeatureID>;

  public removeFeatures!: BelongsToManyRemoveAssociationsMixin<Feature, IFeatureID>;

  public getFeatures!: BelongsToManyGetAssociationsMixin<Feature>;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Role',
    schema: 'public',
  },
);

Role.belongsToMany(Feature, { through: 'RoleFeature' });
Feature.belongsToMany(Role, { through: 'RoleFeature' });

export type TypeRoleModel = typeof Role;
export default Role;
