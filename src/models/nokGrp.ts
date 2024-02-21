import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

class NokGrp extends Model<InferAttributes<NokGrp>, InferCreationAttributes<NokGrp>> {
  id?: number;
  nokGrpName!: string;
  nokGrpCode!: string;  
  nokGrpDesc?: string;
  active!: boolean;

  static associate(models: any) {
    NokGrp.hasMany(models.nokCode, {
      foreignKey: 'nokGrpId',
      as: 'nokCodes'
    });
  }
}

NokGrp.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nokGrpName: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  nokGrpCode: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
  nokGrpDesc: {
    type: DataTypes.TEXT
  },
  active: {
    type: DataTypes.BOOLEAN
  },
}, 
{
  underscored: true,
  timestamps: false,
  modelName: 'nokGrp',
  sequelize,
});

export default NokGrp;