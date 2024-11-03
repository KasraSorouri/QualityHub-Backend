import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class NokRework_AffectedRecipes extends Model {
  public nokReworkId!: number;
  public recipeId!: number;
}

NokRework_AffectedRecipes.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nokReworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'nok_reworks', key: 'id' }
  },
  affectedRecipeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'recipes', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'nok_reworks_affected_recipes'
});

export default NokRework_AffectedRecipes;