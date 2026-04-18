import { Model, DataTypes, BelongsToManyAddAssociationsMixin } from 'sequelize';
import { sequelize } from '../configs/db';
import Station from './station';
import { ReworkStatus } from '../modules/qualityHub/types';

interface NokReworkAttributes {
  id: number;
  nokId: number;
  reworkActionsId?: number[];
  affectedRecipes?: number[];
  reworkShiftId: number;
  reworkOperator: string;
  reworkTime: Date;
  reworkDuration: number;
  reworkManPower: number;
  reworkStation?: Station;
  reworkNote?: string;
  reworkStatus: ReworkStatus;
  usedMaterialCost?: number;
  dismantledMaterialCost?: number;
  recipesWastedTime?: number;
}

interface NokReworkCreationAttributes extends Omit<NokReworkAttributes, 'id'> {}

class NokRework extends Model<NokReworkAttributes, NokReworkCreationAttributes> implements NokReworkAttributes {
  declare id: number;
  declare nokId: number;
  declare reworkActionsId: number[];
  declare affectedRecipes: number[];
  declare reworkShiftId: number;
  declare reworkOperator: string;
  declare reworkTime: Date;
  declare reworkDuration: number;
  declare reworkManPower: number;
  declare reworkStationId: Station | undefined;
  declare reworkNote: string;
  declare reworkStatus: ReworkStatus;
  declare usedMaterialCost: number;
  declare dismantledMaterialCost: number;
  declare recipesWastedTime: number;

  public addRework!: BelongsToManyAddAssociationsMixin<number, number>;
  public addRecipes!: BelongsToManyAddAssociationsMixin<number, number>;
}

NokRework.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nokId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reworkActionsId: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    affectedRecipes: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    reworkShiftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reworkOperator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reworkTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reworkDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reworkManPower: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reworkNote: {
      type: DataTypes.STRING,
    },
    reworkStatus: {
      type: DataTypes.ENUM(...Object.values(ReworkStatus)),
      allowNull: false,
    },
    usedMaterialCost: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dismantledMaterialCost: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    recipesWastedTime: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'nok_rework',
  },
);

export default NokRework;
