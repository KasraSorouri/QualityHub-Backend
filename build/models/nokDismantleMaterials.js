"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
const material_1 = __importDefault(require("./material"));
const types_1 = require("../modules/qualityHub/types");
const nokDetect_1 = __importDefault(require("./nokDetect"));
class NokDismantleMaterials extends sequelize_1.Model {
    static associate() {
        nokDetect_1.default.hasMany(NokDismantleMaterials, { foreignKey: 'nokId' });
        material_1.default.hasMany(NokDismantleMaterials, { foreignKey: 'materialId' });
    }
}
NokDismantleMaterials.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nokId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'nokDetect', key: 'id' },
    },
    reworkId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'nokRework', key: 'id' },
    },
    materialId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'material', key: 'id' },
    },
    actualDismantledQty: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    reusable: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(types_1.Reusable),
    },
    recipeBomId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    materialStatus: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(types_1.MaterialStatus),
    },
    claimStatus: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(types_1.ClaimStatus),
        allowNull: false,
        defaultValue: types_1.ClaimStatus.PENDING,
    },
    unitPrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        defaultValue: 0,
    },
    rwDismantledMaterialId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'rwDismantledMaterial', key: 'id' },
    },
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'nokDismantleMaterials',
});
exports.default = NokDismantleMaterials;
