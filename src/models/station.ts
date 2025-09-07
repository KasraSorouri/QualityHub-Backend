import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { sequelize } from '../configs/db';

class Station extends Model<InferAttributes<Station>, InferCreationAttributes<Station>> {
  id?: number;
  stationName!: string;
  stationCode!: string;
  description?: string;
  active!: boolean;
}

Station.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    stationName: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    stationCode: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    underscored: true,
    timestamps: false,
    modelName: 'station',
    sequelize,
  },
);

export default Station;
