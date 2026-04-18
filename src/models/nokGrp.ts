import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

class NokGrp extends Model<InferAttributes<NokGrp>, InferCreationAttributes<NokGrp>> {
  declare id?: number;
  declare nokGrpName  : string;
  declare nokGrpCode: string;
  declare nokGrpDesc?: string;
  declare active: boolean;
}

NokGrp.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nokGrpName: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    nokGrpCode: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    nokGrpDesc: {
      type: DataTypes.TEXT,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    underscored: true,
    timestamps: false,
    modelName: 'nokGrp',
    sequelize,
  },
);

export default NokGrp;
