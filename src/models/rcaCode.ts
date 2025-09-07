import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

class RcaCode extends Model<InferAttributes<RcaCode>, InferCreationAttributes<RcaCode>> {
  id?: number;
  rcaCode!: string;
  rcaDesc?: string;
  active!: boolean;
  /*
    static associate(models: any) {
        RcaCode.hasMany(models.nokCode, {
            foreignKey: 'nokGrpId',
            as: 'nokCodes'
        });
    }
*/
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
