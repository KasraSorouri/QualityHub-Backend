"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class NokGrp extends sequelize_1.Model {
}
NokGrp.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nokGrpName: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    nokGrpCode: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    nokGrpDesc: {
        type: sequelize_1.DataTypes.TEXT,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    underscored: true,
    timestamps: false,
    modelName: 'nokGrp',
    sequelize: db_1.sequelize,
});
exports.default = NokGrp;
