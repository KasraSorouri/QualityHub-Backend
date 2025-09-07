"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class NokAnalyse extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.closed = false;
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
}
// define Product Model
NokAnalyse.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nokId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    nokCodeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    causeStationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    causeShiftId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    classCodeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    timeWaste: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    materialWaste: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    closed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    closeDate: {
        type: sequelize_1.DataTypes.DATE,
    },
    updatedBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    underscored: true,
    timestamps: false,
    modelName: 'nokAnalyse',
    sequelize: db_1.sequelize,
});
exports.default = NokAnalyse;
