import { injectable } from 'inversify';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'modules/common/infrastructure/db';
import { IFeature } from '../interfaces/IFeature';

@injectable()
export class Feature extends Model<IFeature, IFeature> implements IFeature {
  declare id: number;

  declare name: string;

  declare description: string;
}

Feature.init(
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
    modelName: 'Feature',
    schema: 'public',
  },
);

export type TypeFeatureModel = typeof Feature;
export default Feature;
