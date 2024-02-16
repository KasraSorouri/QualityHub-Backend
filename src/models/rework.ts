import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import Station from './station';
import NokDetect from './nokDetect';
import NokReworks from './nokReworks';

interface ReworkAttributes {
  id: number;
  reworkShortDesc: string;
  description: string;
  order: number;
  nokCodeId: number;
  stationId: number;
  useRecipes: number[];
  affectedRecipes: number[];
  timeDuration?: number;
  active: boolean;
  deprecated: boolean;
}

interface ReworkCreationAttributes extends Omit<ReworkAttributes, 'id'> {}

class Rework extends Model<ReworkAttributes, ReworkCreationAttributes> implements ReworkAttributes {
  id!: number;
  reworkShortDesc!: string;
  description!: string;
  order!: number;
  nokCodeId!: number;
  stationId!: number;
  useRecipes!: number[];
  affectedRecipes!: number[];
  timeDuration?: number;
  active!: boolean;
  deprecated!: boolean;

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
  nokCodeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  useRecipes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  },
  affectedRecipes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  },
  active: {
    type: DataTypes.BOOLEAN,
  },
  deprecated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  timeDuration: {
    type: DataTypes.INTEGER
  }
},

{
  underscored: true,
  timestamps: false,
  modelName: 'rework',
  sequelize,
});

export default Rework;