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
import { Plan } from 'modules/plans/infrastructure/db/models';
import { IUser } from '../interfaces/IUser';
import UserPlan from './UserPlan';

@injectable()
export class User extends Model<IUser, IUser> implements IUser {
  declare email: string;

  declare id: string;

  declare name: string;

  declare password: string;

  declare addRoles: BelongsToManyAddAssociationsMixin<Role, IRoleID>;

  declare removeRoles: BelongsToManyRemoveAssociationsMixin<Role, IRoleID>;

  declare getRoles: BelongsToManyGetAssociationsMixin<Role>;

  declare addFeatures: BelongsToManyAddAssociationsMixin<Feature, IFeatureID>;

  declare removeFeatures: BelongsToManyRemoveAssociationsMixin<Feature, IFeatureID>;

  declare getFeatures: BelongsToManyGetAssociationsMixin<Feature>;

  declare getPlans: BelongsToManyGetAssociationsMixin<Plan>;
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
User.hasMany(UserPlan);

User.belongsToMany(Plan, { through: UserPlan });

Plan.belongsToMany(User, { through: UserPlan });

export type TypeUserModel = typeof User;
export default User;
