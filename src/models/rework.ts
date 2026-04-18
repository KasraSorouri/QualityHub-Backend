import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import RwDismantledMaterials from './reworkDismantledMaterials';

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
  declare id: number;
  declare productId: number;
  declare nokCodeId: number;
  declare stationId: number;
  declare reworkShortDesc: string;
  declare description: string;
  declare order: number;
  declare timeDuration?: number;
  declare active: boolean;
  declare deprecated: boolean;
  declare reworkRecipes: number[];
  declare affectedRecipes: number[];
  declare creationDate: Date;
  declare deprecatedDate: Date;
  declare rwDismantledMaterials?: RwDismantledMaterials;

}

// define Product Model
Rework.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nokCodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reworkShortDesc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    timeDuration: {
      type: DataTypes.INTEGER,
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
      allowNull: false,
    },
    affectedRecipes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
    },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deprecatedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },

  {
    underscored: true,
    timestamps: false,
    modelName: 'rework',
    sequelize,
  },
);

export default Rework;
