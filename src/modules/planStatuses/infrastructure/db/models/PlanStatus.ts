import { injectable } from 'inversify';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'modules/common/infrastructure/db';
import { IPlanStatus } from '../interfaces/IPlanStatus';

@injectable()
export class PlanStatus extends Model<IPlanStatus, IPlanStatus> implements IPlanStatus {
  declare id!: number;

  declare description!: string;

  declare name!: string;
}

PlanStatus.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    modelName: 'PlanStatus',
    schema: 'public',
  },
);

export type TypePlanStatusModel = typeof PlanStatus;
export default PlanStatus;
