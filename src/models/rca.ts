import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

class Rca extends Model<InferAttributes<Rca>, InferCreationAttributes<Rca>> {
  id?: number;
  rcaCodeId!: number;
  nokId!: number;
  whCauseId?: number;
  whCauseName?: string;
  description?: string;
  improveSugestion?: string;

  static associate(models: any) {
    Rca.belongsTo(models.RcaCode, {
      foreignKey: 'rcaCodeId',
      as: 'racCode'
    });

    Rca.belongsTo(models.nokAnalyse, {
      foreignKey: 'nokId', 
      as: 'nokAnalyse'
    });
  }
}

// define RCA Model
Rca.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rcaCodeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nokId: {
    type: DataTypes.INTEGER,
    allowNull: false
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
  improveSugestion: {
    type: DataTypes.STRING,
  }
},

{
  underscored: true,
  timestamps: false,
  modelName: 'rca',
  sequelize,
});

export default Rca;