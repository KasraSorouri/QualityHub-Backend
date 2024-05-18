import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

interface NokReworkAttributes {
  id: number;
  nokId: number;
  reworkActionsId?: number[];
  affectedRecipes?: number[];
  reworkShiftId: number;
}


interface NokReworkCreationAttributes extends Omit<NokReworkAttributes, 'id'> {}

class NokRework extends Model<NokReworkAttributes, NokReworkCreationAttributes> implements NokReworkAttributes {
  id!: number;
  nokId!: number;
  reworkActionsId!: number[];
  affectedRecipes!: number[];
  reworkShiftId!: number;
}

NokRework.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nokId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
  ,reworkActionsId: {
    type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true
  }
  ,affectedRecipes: {
    type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: true
  }
  ,reworkShiftId: {
    type: DataTypes.INTEGER, allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'nokRework'
});

export default NokRework;