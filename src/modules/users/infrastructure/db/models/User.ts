import { injectable } from 'inversify';
import {
  DataTypes,
  Model,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyRemoveAssociationsMixin,
} from 'sequelize';
import { sequelize } from 'modules/common/infrastructure/db';
import { Role } from 'modules/roles/infrastructure/db/models';
import { Feature } from 'modules/features/infrastructure/db/models';
import { IRoleID } from 'modules/roles/infrastructure/db/interfaces/IRole';
import { IFeatureID } from 'modules/features/infrastructure/db/interfaces/IFeature';
import { IUser } from '../interfaces/IUser';

@injectable()
export class User extends Model<IUser, IUser> implements IUser {
  public email!: string;

  public id!: string;

  public name!: string;

  public password!: string;

  public addRoles!: BelongsToManyAddAssociationsMixin<Role, IRoleID>;

  public removeRoles!: BelongsToManyRemoveAssociationsMixin<Role, IRoleID>;

  public getRoles!: BelongsToManyGetAssociationsMixin<Role>;

  public addFeatures!: BelongsToManyAddAssociationsMixin<Feature, IFeatureID>;

  public removeFeatures!: BelongsToManyRemoveAssociationsMixin<Feature, IFeatureID>;

  public getFeatures!: BelongsToManyGetAssociationsMixin<Feature>;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    schema: 'public',
  },
);

Role.belongsToMany(User, { through: 'UserRole' });
User.belongsToMany(Role, { through: 'UserRole' });

Feature.belongsToMany(User, { through: 'UserFeature' });
User.belongsToMany(Feature, { through: 'UserFeature' });

export type TypeUserModel = typeof User;
export default User;
