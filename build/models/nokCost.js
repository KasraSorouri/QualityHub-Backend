"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
class NokCost extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.updatedAt = new Date();
    }
}
NokCost.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nokId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    reworkId: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        allowNull: false,
    },
    materialWaste: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    timeWaste: {
        type: sequelize_1.DataTypes.DECIMAL,
    },
    editLocked: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'nok_cost',
});
exports.default = NokCost;
