import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../configs/db';

interface NokAnalyseAttributes {
  id: number;
  nokId: number;
  nokCodeId: number;
  causeStationId: number;
  causeShiftId: number;
  classCodeId: number;
  description: string;
  timeWaste?: number;
  materialWaste?: number;
  closed?: boolean;
  closeDate?: Date;
  updatedBy: number;
  updatedAt: Date;
}

interface NokAnalyseCreationAttributes extends Omit<NokAnalyseAttributes, 'id'> {}

class NokAnalyse extends Model<NokAnalyseAttributes, NokAnalyseCreationAttributes> implements NokAnalyseAttributes {
  id!: number;
  nokId!: number;
  nokCodeId!: number;
  causeStationId!: number;
  causeShiftId!: number;
  classCodeId!: number;
  description!: string;
  timeWaste?: number;
  materialWaste?: number;
  closed?: boolean = false;
  closeDate?: Date;
  updatedBy!: number;
  updatedAt!: Date;

  /*
  static associate() {
    NokAnalyse.belongsTo(NokDetect,{
      foreignKey: 'nokId',
      as: 'nok'
    });

    NokAnalyse.belongsTo(Station, {
      foreignKey: 'causeStationId',
      as: 'causeStation'
    });

    NokAnalyse.belongsTo(WorkShift, {
      foreignKey: 'causeShiftId',
      as: 'causeShift'
    });

    NokAnalyse.belongsTo(NokCode, {
      foreignKey: 'nokCodeId',
      as: 'nokCode'
    });

    NokAnalyse.hasMany(Rca, {
      foreignKey: 'nokId',
      as: 'rca'
    });
  } 
  */ 
}

// define Product Model
NokAnalyse.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nokId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  nokCodeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  causeStationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  causeShiftId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  classCodeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  timeWaste: {
    type: DataTypes.INTEGER,
  },
  materialWaste: {
    type: DataTypes.INTEGER,
  },
  closed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  closeDate: {
    type: DataTypes.DATE,
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
},

{
  underscored: true,
  timestamps: false,
  modelName: 'nokAnalyse',
  sequelize,
});

export default NokAnalyse;