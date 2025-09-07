"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class Material extends sequelize_1.Model {
}
// define Product Model
Material.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    itemShortName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    itemLongName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    itemCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    unit: {
        type: sequelize_1.DataTypes.STRING,
    },
    traceable: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    underscored: true,
    timestamps: false,
    modelName: 'material',
    sequelize: db_1.sequelize,
});
exports.default = Material;
