import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

interface NokCostAttributes {
  id: number;
  nokId: number;
  reworkId: number;
  materialWaste: number;
  timeWaste: number;
  editLocked: boolean;
  updatedAt: Date;
}

interface NokCostCreationAttributes extends Omit<NokCostAttributes, 'id'> {}

class NokCost extends Model<NokCostAttributes, NokCostCreationAttributes> implements NokCostAttributes {
  id!: number;
  nokId!: number;
  reworkId!: number;
  materialWaste!: number;
  timeWaste!: number;
  editLocked!: boolean;
  updatedAt: Date = new Date();
}

NokCost.init(
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
    reworkId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    materialWaste: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    timeWaste: {
      type: DataTypes.DECIMAL,
    },
    editLocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'nok_cost',
  },
);

export default NokCost;
