import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import Recipe from './recipe';
import Material from './material';

class RecipeBoms extends Model {
  public id!: number;
  public recipeId!: number;
  public materialId!: number;
  public qty!: number;
  public reusable!: boolean;

  static associate() {
    RecipeBoms.belongsTo(Recipe, { foreignKey: 'recipeId' });
    RecipeBoms.belongsTo(Material, { foreignKey: 'materialId' });
  }
}

RecipeBoms.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  recipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'products', key: 'id' }
  },
  materialId: {
    type: DataTypes.INTEGER,   allowNull: true,
    references: { model: 'boms', key: 'id' }
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull:true
  },
  reusable: {
    type: DataTypes.BOOLEAN
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'recipeBoms'
});

export default RecipeBoms;