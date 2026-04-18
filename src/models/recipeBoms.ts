import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import Recipe from './recipe';
import Material from './material';
import { Reusable } from '../modules/qualityHub/types';

class RecipeBoms extends Model {
  declare id: number;
  declare recipeId: number;
  declare materialId: number;
  declare qty: number;
  declare reusable: Reusable;

  static associate(): void {
    RecipeBoms.belongsTo(Recipe, { foreignKey: 'recipeId' });
    RecipeBoms.belongsTo(Material, { foreignKey: 'materialId' });
  }
}

RecipeBoms.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'products', key: 'id' },
    },
    materialId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'boms', key: 'id' },
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reusable: {
      type: DataTypes.ENUM,
      values: Object.values(Reusable),
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'recipeBoms',
  },
);

export default RecipeBoms;
