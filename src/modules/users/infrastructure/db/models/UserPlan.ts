import { injectable } from 'inversify';
import {
  DataTypes,
  Model,
} from 'sequelize';
import { sequelize } from 'modules/common/infrastructure/db';
import { Consumption } from 'modules/consumptions/infrastructure/db/models';
import { PlanStatus } from 'modules/planStatuses/infrastructure/db/models';
import { Country } from 'modules/countries/infrastructure/db/models';
import { Plan } from 'modules/plans/infrastructure/db/models';
import { IUserPlan } from '../interfaces/IUserPlan';

@injectable()
class UserPlan extends Model<IUserPlan, IUserPlan> {
  declare UserId!: string;

  declare PlanId!: string;

  declare ConsumptionId!: string;

  declare StatusId!: number;

  declare CountryId!: number;

  declare dateStart!: string;

  declare dateEnd!: string;
}

UserPlan.init(
  {
    UserId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    PlanId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ConsumptionId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    StatusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    CountryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dateStart: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dateEnd: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'UserPlan',
    tableName: 'UserPlan',
    schema: 'public',
  },
);

UserPlan.belongsTo(Consumption, { foreignKey: 'ConsumptionId' });
UserPlan.belongsTo(PlanStatus, { foreignKey: 'StatusId' });
UserPlan.belongsTo(Country, { foreignKey: 'CountryId' });
UserPlan.belongsTo(Plan);
Plan.hasMany(UserPlan);

export type TypeUserPlanModel = typeof UserPlan;
export default UserPlan;
