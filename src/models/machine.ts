import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

class Machine extends Model<InferAttributes<Machine>, InferCreationAttributes<Machine>> {
  id?: number;
  machineName!: string;
  machineCode!: string;
  description?: string;
  active!: boolean;
}

Machine.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  machineName: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  machineCode: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
  },
  active: {
    type: DataTypes.BOOLEAN
  },
}, 
{
  underscored: true,
  timestamps: false,
  modelName: 'machine',
  sequelize,
});

export default Machine;