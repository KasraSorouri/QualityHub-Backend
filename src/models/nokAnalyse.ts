import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import Station from './station';
import WorkShift from './workShif';
import NokCode from './nokCode';
import NokDetect from './nokDetect';
import Rca from './rca';

interface NokAnalyseAttributes {
  id: number;
  nokId: number;
  nokCodeId: number;
  causeStationId: number;
  causeShiftId: number;
  description: string;
  closeDate: Date;
}

interface NokAnalyseCreationAttributes extends Omit<NokAnalyseAttributes, 'id'> {}

class NokAnalyse extends Model<NokAnalyseAttributes, NokAnalyseCreationAttributes> implements NokAnalyseAttributes {
  id!: number;
  nokId!: number;
  nokCodeId!: number;
  causeStationId!: number;
  causeShiftId!: number;
  description!: string;
  closeDate!: Date;

  static associate() {
    NokAnalyse.belongsTo(NokDetect,{
      foreignKey: 'nokId',
      as: 'nok'
    });

    NokAnalyse.belongsTo(Station, {
      foreignKey: 'detectStationId',
      as: 'station'
    });

    NokAnalyse.belongsTo(WorkShift, {
      foreignKey: 'detectShiftId',
      as: 'workShift'
    });

    NokAnalyse.belongsTo(NokCode, {
      foreignKey: 'initNokCodeId',
      as: 'nokCode'
    });

    NokAnalyse.hasMany(Rca, {
      foreignKey: 'nokId',
      as: 'rca'
    });
  }  
}

// define Product Model
NokAnalyse.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nokId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  nokCodeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  causeStationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  causeShiftId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  closeDate: {
    type: DataTypes.DATE,
  }
},

{
  underscored: true,
  timestamps: false,
  modelName: 'nokAnalyse',
  sequelize,
});

export default NokAnalyse;