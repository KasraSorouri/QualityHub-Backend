import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';
import Material from './material';
import { ClaimStatus, MaterialStatus, Reusable } from '../modules/qualityHub/types';
import NokDetect from './nokDetect';

class NokDismantleMaterials extends Model {
  declare id: number;
  declare nokId: number;
  declare reworkId: number;
  declare materialId: number;
  declare actualDismantledQty: number;
  declare reusable: Reusable;
  declare recipeBomId: number;
  declare materialStatus: MaterialStatus;
  declare claimStatus: ClaimStatus;
  declare unitPrice: number;
  declare rwDismantledMaterialId: number;

  static associate(): void {
    NokDetect.hasMany(NokDismantleMaterials, { foreignKey: 'nokId' });
    Material.hasMany(NokDismantleMaterials, { foreignKey: 'materialId' });
  }
}

NokDismantleMaterials.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nokId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'nokDetect', key: 'id' },
    },
    reworkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'nokRework', key: 'id' },
    },
    materialId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'material', key: 'id' },
    },
    actualDismantledQty: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reusable: {
      type: DataTypes.ENUM,
      values: Object.values(Reusable),
    },
    recipeBomId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    materialStatus: {
      type: DataTypes.ENUM,
      values: Object.values(MaterialStatus),
    },
    claimStatus: {
      type: DataTypes.ENUM,
      values: Object.values(ClaimStatus),
      allowNull: false,
      defaultValue: ClaimStatus.PENDING,
    },
    unitPrice: {
      type: DataTypes.DECIMAL,
      defaultValue: 0,
    },
    rwDismantledMaterialId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'rwDismantledMaterial', key: 'id' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'nokDismantleMaterials',
  },
);

export default NokDismantleMaterials;
