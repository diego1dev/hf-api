import { injectable } from 'inversify';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'modules/common/infrastructure/db';
import { IConsumption } from '../interfaces/IConsumption';

@injectable()
export class Consumption extends Model<IConsumption, IConsumption> implements IConsumption {
  declare id!: string;

  declare total!: number;
}

Consumption.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Consumption',
    schema: 'public',
  },
);

export type TypeConsumptionModel = typeof Consumption;
export default Consumption;
