import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import Station from './station';
import Product from './product';
import WorkShift from './workShif';
import { NokStatus, ProductStatus } from '../modules/qualityHub/types';
import NokCode from './nokCode';
import NokAnalyse from './nokAnalyse';
import Rework from './rework';
import NokReworks from './nokReworks';

interface NokDetectAttributes {
  id: number;
  productId: number;
  productSN: string;
  initNokCodeId: number;
  detectStationId: number;
  detectShiftId: number;
  description: string;
  detectTime: Date;
  nokStatus: NokStatus;
  productStatus: ProductStatus;
  removeReport: boolean;
}

interface NokDetectCreationAttributes extends Omit<NokDetectAttributes, 'id'> {}

class NokDetect extends Model<NokDetectAttributes, NokDetectCreationAttributes> implements NokDetectAttributes {
  id!: number;
  productId!: number;
  productSN!: string;
  initNokCodeId!: number;
  detectStationId!: number;
  detectShiftId!: number;
  description!: string;
  detectTime!: Date;
  nokStatus!: NokStatus;
  productStatus!: ProductStatus;
  removeReport!: boolean;

  static associate() {
    NokDetect.belongsTo(Product, {
      foreignKey: 'productId',
      as: 'product'
    });
  
    NokDetect.belongsTo(Station, {
      foreignKey: 'detectStationId',
      as: 'station'
    });

    NokDetect.belongsTo(WorkShift, {
      foreignKey: 'detectShiftId',
      as: 'workShift'
    });

    NokDetect.belongsTo(NokCode, {
      foreignKey: 'initNokCodeId',
      as: 'nokCode'
    });

    NokDetect.hasOne(NokAnalyse, {
      foreignKey: 'nokId',
    })
    
  
    NokDetect.belongsToMany(Rework, {
      through: NokReworks,
      foreignKey: 'nokDetectId',
      as: 'rework'
    });

  }  
}

// define Product Model
NokDetect.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productSN: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  initNokCodeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  detectStationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  detectShiftId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  detectTime: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  nokStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'PENDING'
  },
  description: {
    type: DataTypes.STRING,
  },
  productStatus: {
    type: DataTypes.STRING,
    defaultValue: 'NOK'
  },
  removeReport: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
},

{
  underscored: true,
  timestamps: false,
  modelName: 'nokDetect',
  sequelize,
});

export default NokDetect;