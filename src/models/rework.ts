import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
/*
import Station from './station';
import Product from './product';
import NokCode from './nokCode';
import Material from './material';
import RwDismantledMaterials from './reworkDismantledMaterials';
*/
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
  reworkRecipes?: number[];
  affectedRecipes?: number[];
  creationDate: Date;
  deprecatedDate?: Date;
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
  reworkRecipes!: number[];
  affectedRecipes!: number[];
  creationDate!: Date;
  deprecatedDate!: Date;

  /*
  static associate() {
    Rework.belongsTo(Product, {
      foreignKey: 'productId',
      as: 'product'
    });
  
    Rework.belongsTo(Station, {
      foreignKey: 'stationId',
      as: 'station'
    });

    Rework.belongsTo(NokCode, {
      foreignKey: 'nokCodeId',
      as: 'nokCode'
    });
    Rework.belongsToMany(Material, {
      through: RwDismantledMaterials,
      foreignKey: 'reworkId',
      as: 'dismantledMaterial'
    });
  }  
  */
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
  reworkRecipes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  },
  affectedRecipes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  deprecatedDate: {
    type: DataTypes.DATE,
    allowNull: true
  }
},

{
  underscored: true,
  timestamps: false,
  modelName: 'rework',
  sequelize,
});

export default Rework;