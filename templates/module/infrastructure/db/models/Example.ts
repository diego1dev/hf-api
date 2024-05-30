import { injectable } from 'inversify';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from 'modules/common/infrastructure/db';
import { IExample } from '../interfaces/IExample';

@injectable()
export class Example extends Model<IExample, IExample> implements IExample {
  declare id: string;

  declare description: string;

  declare name: string;
}

Example.init(
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
    modelName: 'Example',
    schema: 'public',
  },
);

export type TypeExampleModel = typeof Example;
export default Example;
