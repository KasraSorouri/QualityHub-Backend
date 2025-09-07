"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class RwDismantledMaterials extends sequelize_1.Model {
}
RwDismantledMaterials.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reworkId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'reworks', key: 'id' },
    },
    recipeBomId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'recipeBoms', key: 'id' },
    },
    dismantledQty: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    note: {
        type: sequelize_1.DataTypes.STRING,
    },
    mandatoryRemove: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'rwDismantledMaterials',
});
exports.default = RwDismantledMaterials;
