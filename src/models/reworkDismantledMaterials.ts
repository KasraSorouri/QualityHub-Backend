import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class RwDismantledMaterials extends Model {
  public id!: number;
  public reworkId!: number;
  public recipeBomId!: number;
  public dismantledQty!: number;
  public note?: string;
  public mandatoryRemove!: boolean;
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