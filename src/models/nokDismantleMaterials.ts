import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import Material from './material';
import { ClaimStatus, MaterialStatus, Reusable } from '../modules/qualityHub/types';
import NokDetect from './nokDetect';

class DismantleMaterials extends Model {
  public id!: number;
  public nokId!: number;
  public materialId!: number;
  public qty!: number;
  public reusable!: Reusable;
  public materialStatus!: MaterialStatus;
  public ClaimStatus!: ClaimStatus;

  static associate() {
    NokDetect.hasMany(DismantleMaterials, { foreignKey: 'nokId' });
    Material.hasMany(DismantleMaterials, { foreignKey: 'materialId' });
  }
}

  DismantleMaterials.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nokId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'nokDetect', key: 'id' }
  },
  materialId: {
    type: DataTypes.INTEGER,   allowNull: true,
    references: { model: 'material', key: 'id' }
  },
  qty: {
    type: DataTypes.INTEGER,
    allowNull:true
  },
  reusable: {
    type: DataTypes.ENUM,
    values: Object.values(Reusable)
  },
  materialStatus: {
    type: DataTypes.ENUM,
    values: Object.values(MaterialStatus)
  },
  claimStatus: {
    type: DataTypes.ENUM,
    values: Object.values(ClaimStatus),
    allowNull: false,
    defaultValue: ClaimStatus.PENDING
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'dismantleMaterials'
});

export default DismantleMaterials;