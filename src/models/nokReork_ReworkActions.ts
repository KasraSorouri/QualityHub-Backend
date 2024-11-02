import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class NokRework_ReworkActions extends Model {
  public nokReworkId!: number;
  public reworkId!: number;
}

NokRework_ReworkActions.init({
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
  reworkActionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'reworks', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'nok_reworks_rework_actions'
});

export default NokRework_ReworkActions;