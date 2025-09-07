"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class Product extends sequelize_1.Model {
}
// define Product Model
Product.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    productCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    productGrpId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    underscored: true,
    timestamps: false,
    modelName: 'product',
    sequelize: db_1.sequelize,
});
exports.default = Product;
