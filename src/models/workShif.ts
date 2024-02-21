import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

class WorkShift extends Model<InferAttributes<WorkShift>, InferCreationAttributes<WorkShift>> {
  id?: number;
  shiftName!: string;
  shiftCode!: string;
  active!: boolean;
}

  WorkShift.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  shiftName: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  shiftCode: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  active: {
    type: DataTypes.BOOLEAN
  },
}, 
{
  underscored: true,
  timestamps: false,
  modelName: 'workShift',
  sequelize,
});

export default WorkShift;