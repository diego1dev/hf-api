import { injectable } from 'inversify';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'modules/common/infrastructure/db';
import { IPlan } from '../interfaces/IPlan';

@injectable()
export class Plan extends Model<IPlan, IPlan> implements IPlan {
  declare id: string;

  declare description: string;

  declare name: string;
}

Plan.init(
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
    modelName: 'Plan',
    schema: 'public',
  },
);

export type TypePlanModel = typeof Plan;
export default Plan;
