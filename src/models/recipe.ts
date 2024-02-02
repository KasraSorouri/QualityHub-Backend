import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import Station from './station';
import Product from './product';

class Recipe  extends Model<InferAttributes<Recipe>, InferCreationAttributes<Recipe>> {
  id?: number;
  recipeCode!: string;
  description!: string;
  order!: number;
  active!: boolean;
  productId!: number;
  stationId!: number;
  station?: Station;
  product?: Product;

  static associate(models: any) {
    Recipe.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product'
    }),
  
    Recipe.belongsTo(models.Station, {
      foreignKey: 'stationId',
      as: 'station'
    })
  }
}

// define Product Model
Recipe.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recipeCode: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.STRING,
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  active: {
    type: DataTypes.BOOLEAN
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
},

{
  underscored: true,
  timestamps: false,
  modelName: 'recipe',
  sequelize,
});

export default Recipe;