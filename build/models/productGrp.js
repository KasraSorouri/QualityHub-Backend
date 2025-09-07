"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class ProductGrp extends sequelize_1.Model {
}
ProductGrp.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    groupName: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    groupCode: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    underscored: true,
    timestamps: false,
    modelName: 'productGrp',
    sequelize: db_1.sequelize,
});
exports.default = ProductGrp;
