import { injectable } from 'inversify';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'modules/common/infrastructure/db';
import { ICountry } from '../interfaces/ICountry';

@injectable()
export class Country extends Model<ICountry, ICountry> implements ICountry {
  public id!: string;

  public description!: string;

  public name!: string;
}

Country.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Country',
    schema: 'public',
  },
);

export type TypeCountryModel = typeof Country;
export default Country;
