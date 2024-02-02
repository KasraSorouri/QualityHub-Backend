import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import Station from './station';
import Product from './product';
import RecipeBoms from './recipeBoms';
import Material from './material';

interface RecipeAttributes {
  id: number;
  recipeCode: string;
  description: string;
  order: number;
  active: boolean;
  productId: number;
  stationId: number;
}

interface RecipeCreationAttributes extends Omit<RecipeAttributes, 'id'> {}

class Recipe extends Model<RecipeAttributes, RecipeCreationAttributes> implements RecipeAttributes {
  id!: number;
  recipeCode!: string;
  description!: string;
  order!: number;
  active!: boolean;
  productId!: number;
  stationId!: number;
  station?: Station;
  product?: Product;
  recipeBoms?: RecipeBoms[];

  static associate() {
    Recipe.belongsTo(Product, {
      foreignKey: 'productId',
      as: 'product'
    });
  
    Recipe.belongsTo(Station, {
      foreignKey: 'stationId',
      as: 'station'
    });

    Recipe.belongsToMany(Material, {
      through: RecipeBoms,
      foreignKey: 'recipeId',
      as: 'materials'
    });
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