"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class ClassCode extends sequelize_1.Model {
}
ClassCode.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    className: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    classCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    classDesc: {
        type: sequelize_1.DataTypes.STRING,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    underscored: true,
    timestamps: false,
    modelName: 'classCode',
    sequelize: db_1.sequelize,
});
exports.default = ClassCode;
