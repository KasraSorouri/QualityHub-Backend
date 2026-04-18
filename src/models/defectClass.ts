import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

class ClassCode extends Model<InferAttributes<ClassCode>, InferCreationAttributes<ClassCode>> {
  declare id?: number;
  declare className: string;
  declare classCode: string;
  declare classDesc?: string;
  declare active: boolean;

}

ClassCode.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    className: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    classCode: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    classDesc: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    underscored: true,
    timestamps: false,
    modelName: 'classCode',
    sequelize,
  },
);

export default ClassCode;
