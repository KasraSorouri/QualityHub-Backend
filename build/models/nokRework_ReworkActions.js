"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class NokRework_ReworkActions extends sequelize_1.Model {
}
NokRework_ReworkActions.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nokReworkId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'nok_reworks', key: 'id' },
    },
    reworkActionId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'reworks', key: 'id' },
    },
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'nok_reworks_rework_actions',
});
exports.default = NokRework_ReworkActions;
