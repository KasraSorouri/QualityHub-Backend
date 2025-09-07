"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class Rework extends sequelize_1.Model {
}
// define Product Model
Rework.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nokCodeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    stationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    reworkShortDesc: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    order: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    timeDuration: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    deprecated: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reworkRecipes: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
        allowNull: false,
    },
    affectedRecipes: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
        allowNull: false,
    },
    creationDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    deprecatedDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    underscored: true,
    timestamps: false,
    modelName: 'rework',
    sequelize: db_1.sequelize,
});
exports.default = Rework;
