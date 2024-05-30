import { injectable } from 'inversify';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'modules/common/infrastructure/db';
import { ICountry } from '../interfaces/ICountry';

@injectable()
export class Country extends Model<ICountry, ICountry> implements ICountry {
  declare id!: number;

  declare name!: string;

  declare iso!: string;

  declare url_flag!: string;
}

Country.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    iso: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url_flag: {
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
