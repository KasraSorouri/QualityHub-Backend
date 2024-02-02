import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class RecipeBoms extends Model {
  public id!: number;
  public recipeId!: number;
  public materialId!: number;
  public qty!: number;
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
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'recipeBoms'
});

export default RecipeBoms;