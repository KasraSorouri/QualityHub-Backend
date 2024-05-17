import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class RwDismantledMaterials extends Model {
  public id!: number;
  public reworkId!: number;
  public recipeBomId!: number;
  //public recipeId?: number;
  //public materialId!: number;
  public dismantledQty!: number;
  public note?: string;
  public mandatoryRemove!: boolean;

  /*
  static associate() {
    RwDismantledMaterials.belongsTo(Rework, { foreignKey: 'reworkId' });
    RwDismantledMaterials.belongsTo(Material, { foreignKey: 'materialId' });
  }
  */
}

  RwDismantledMaterials.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reworkId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'reworks', key: 'id' }
  },
  recipeBomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'recipeBoms', key: 'id' }
  },
  /*
  recipeId: {
    type: DataTypes.INTEGER,
    references: { model: 'recipes', key: 'id' }
  },
  materialId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'materials', key: 'id' }
  },
  */
  dismantledQty: {
    type: DataTypes.INTEGER,
    allowNull:true
  },
  note: {
    type: DataTypes.STRING,
  },
  mandatoryRemove: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'rwDismantledMaterials'
});

export default RwDismantledMaterials;