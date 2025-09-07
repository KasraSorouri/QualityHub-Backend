"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
const types_1 = require("../modules/qualityHub/types");
class NokRework extends sequelize_1.Model {
}
NokRework.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nokId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    reworkActionsId: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
        allowNull: true,
    },
    affectedRecipes: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
        allowNull: true,
    },
    reworkShiftId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    reworkOperator: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    reworkTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    reworkDuration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    reworkManPower: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    reworkNote: {
        type: sequelize_1.DataTypes.STRING,
    },
    reworkStatus: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(types_1.ReworkStatus)),
        allowNull: false,
    },
    usedMaterialCost: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    dismantledMaterialCost: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    recipesWastedTime: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'nok_rework',
});
exports.default = NokRework;
