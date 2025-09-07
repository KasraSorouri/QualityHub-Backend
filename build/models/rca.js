"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class Rca extends sequelize_1.Model {
}
// define RCA Model
Rca.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rcaCodeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nokId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    whCauseId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    whCauseName: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    improveSuggestion: {
        type: sequelize_1.DataTypes.STRING,
    },
    createBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    underscored: true,
    timestamps: false,
    modelName: 'rca',
    sequelize: db_1.sequelize,
});
exports.default = Rca;
