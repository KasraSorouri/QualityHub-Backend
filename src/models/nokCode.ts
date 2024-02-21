import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class NokCode extends Model<InferAttributes<NokCode>, InferCreationAttributes<NokCode>> {
  id?: number;
  nokCode!: string;
  nokDesc?: string;
  active!: boolean;
  nokGrpId!: number;

  static associate(models: any) {
    NokCode.belongsTo(models.NokGrp, {
      foreignKey: 'nokGrpId',
      as: 'nokGrp'
    });
  }
}

// define Product Model
NokCode.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nokCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nokDesc: {
    type: DataTypes.STRING,
  },
  active: {
    type: DataTypes.BOOLEAN
  },
  nokGrpId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},

{
  underscored: true,
  timestamps: false,
  modelName: 'nokCode',
  sequelize,
});

export default NokCode;