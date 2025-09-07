"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class Machine extends sequelize_1.Model {
}
Machine.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    machineName: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    machineCode: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    stationId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    underscored: true,
    timestamps: false,
    modelName: 'machine',
    sequelize: db_1.sequelize,
});
exports.default = Machine;
