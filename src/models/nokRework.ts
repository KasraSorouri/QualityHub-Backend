import { Model, DataTypes } from 'sequelize';
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
}


interface NokReworkCreationAttributes extends Omit<NokReworkAttributes, 'id'> {}

class NokRework extends Model<NokReworkAttributes, NokReworkCreationAttributes> implements NokReworkAttributes {
  id!: number;
  nokId!: number;
  reworkActionsId!: number[];
  affectedRecipes!: number[];
  reworkShiftId!: number;
  reworkOperator!: string;
  reworkTime!: Date;
  reworkDuration!: number;
  reworkManPower!: number;
  reworkStation!: Station | undefined;
  reworkNote!: string;
  reworkStatus!: ReworkStatus;
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
  },
  reworkOperator: {
    type: DataTypes.STRING, allowNull: false
  },
  reworkTime: {
    type: DataTypes.DATE, allowNull: false
  },
  reworkDuration: {
    type: DataTypes.INTEGER, allowNull: false
  },
  reworkManPower: {
    type: DataTypes.INTEGER, allowNull: false
  },
  reworkNote: {
    type: DataTypes.STRING
  },
  reworkStatus: {
    type: DataTypes.ENUM(...Object.values(ReworkStatus)), allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'nokRework'
});

export default NokRework;