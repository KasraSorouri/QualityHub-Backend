import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import NokDetect from './nokDetect';
import Rework from './rework';

class NokReworks extends Model {
  public id!: number;
  public nokId!: number;
  public reworkId!: number;

  static associate() {
    NokReworks.belongsTo(NokDetect, { foreignKey: 'nokId' });
    NokReworks.belongsTo(Rework, { foreignKey: 'reworkId' });
  }
}

NokReworks.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nokId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'nokDetecs', key: 'id' }
  },
  reworkId: {
    type: DataTypes.INTEGER,   allowNull: true,
    references: { model: 'reworks', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'nokReworks'
});

export default NokReworks;