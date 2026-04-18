import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class Rca extends Model<InferAttributes<Rca>, InferCreationAttributes<Rca>> {
  declare id?: number;
  declare rcaCodeId: number;
  declare nokId: number;
  declare whCauseId?: number;
  declare whCauseName?: string;
  declare description?: string;
  declare improveSuggestion?: string;
  declare createBy: number;
  declare createdAt?: Date;
}

// define RCA Model
Rca.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rcaCodeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nokId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    whCauseId: {
      type: DataTypes.INTEGER,
    },
    whCauseName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    improveSuggestion: {
      type: DataTypes.STRING,
    },
    createBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },

  {
    underscored: true,
    timestamps: false,
    modelName: 'rca',
    sequelize,
  },
);

export default Rca;
