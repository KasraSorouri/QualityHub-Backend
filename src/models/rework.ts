import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import Station from './station';
import NokDetect from './nokDetect';
import NokReworks from './nokReworks';

interface ReworkAttributes {
  id: number;
  productId: number;
  nokCodeId: number;
  stationId: number;
  reworkShortDesc: string;
  description?: string;
  order: number;
  timeDuration?: number;
  active: boolean;
  deprecated: boolean;
  useRecipes: number[];
  affectedRecipes: number[];
}

interface ReworkCreationAttributes extends Omit<ReworkAttributes, 'id'> {}

class Rework extends Model<ReworkAttributes, ReworkCreationAttributes> implements ReworkAttributes {
  id!: number;
  productId!: number;
  nokCodeId!: number;
  stationId!: number;
  reworkShortDesc!: string;
  description!: string;
  order!: number;
  timeDuration?: number;
  active!: boolean;
  deprecated!: boolean;
  useRecipes!: number[];
  affectedRecipes!: number[];

  static associate() {
    Rework.belongsTo(NokDetect, {
      foreignKey: 'nokCodeId',
      as: 'nok'
    });
  
    Rework.belongsTo(Station, {
      foreignKey: 'stationId',
      as: 'station'
    });

    Rework.belongsToMany(NokDetect, {
      through: NokReworks,
      foreignKey: 'reworkId',
      as: 'nok'
    });
  }  
}

// define Product Model
Rework.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nokCodeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  reworkShortDesc: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  order: {
    type: DataTypes.INTEGER
  },
  timeDuration: {
    type: DataTypes.INTEGER
  },
  active: {
    type: DataTypes.BOOLEAN,
  },
  deprecated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  useRecipes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  },
  affectedRecipes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  },
},

{
  underscored: true,
  timestamps: false,
  modelName: 'rework',
  sequelize,
});

export default Rework;