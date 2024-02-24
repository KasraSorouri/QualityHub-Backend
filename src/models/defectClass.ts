import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

class ClassCode extends Model<InferAttributes<ClassCode>, InferCreationAttributes<ClassCode>> {
  id?: number;
  className!: string;
  classCode!: string;  
  classDesc?: string;
  active!: boolean;

  static associate(models: any) {
    ClassCode.hasMany(models.nokCode, {
      foreignKey: 'nokGrpId',
      as: 'nokCodes'
    });
  }
}

ClassCode.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  className: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  classCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  classDesc: {
    type: DataTypes.STRING
  },
  active: {
    type: DataTypes.BOOLEAN
  },
}, 
{
  underscored: true,
  timestamps: false,
  modelName: 'classCode',
  sequelize,
});

export default ClassCode;