"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class Station extends sequelize_1.Model {
}
Station.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    stationName: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    stationCode: {
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
}, {
    underscored: true,
    timestamps: false,
    modelName: 'station',
    sequelize: db_1.sequelize,
});
exports.default = Station;
