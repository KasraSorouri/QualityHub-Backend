import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

class RcaCode extends Model<InferAttributes<RcaCode>, InferCreationAttributes<RcaCode>> {
  declare id?: number;
  declare rcaCode: string;
  declare rcaDesc?: string;
  declare active: boolean;
}

RcaCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rcaCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    rcaDesc: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    underscored: true,
    timestamps: false,
    modelName: 'rcaCode',
    sequelize,
  },
);

export default RcaCode;
