"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
// define Role Model
class Role extends sequelize_1.Model {
}
Role.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    roleName: {
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
    modelName: 'role',
    sequelize: db_1.sequelize,
});
exports.default = Role;
