"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class RcaCode extends sequelize_1.Model {
}
RcaCode.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rcaCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    rcaDesc: {
        type: sequelize_1.DataTypes.STRING,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
}, {
    underscored: true,
    timestamps: false,
    modelName: 'rcaCode',
    sequelize: db_1.sequelize,
});
exports.default = RcaCode;
