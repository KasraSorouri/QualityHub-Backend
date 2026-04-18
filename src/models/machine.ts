import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

class Machine extends Model<InferAttributes<Machine>, InferCreationAttributes<Machine>> {
  declare id?: number;
  declare machineName: string;
  declare machineCode: string;
  declare description?: string;
  declare active: boolean;
  declare stationId?: number;
}

Machine.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    machineName: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    machineCode: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
    stationId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    underscored: true,
    timestamps: false,
    modelName: 'machine',
    sequelize,
  },
);

export default Machine;
