"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
const product_1 = __importDefault(require("./product"));
const nokAnalyse_1 = __importDefault(require("./nokAnalyse"));
const rework_1 = __importDefault(require("./rework"));
const nokRework_1 = __importDefault(require("./nokRework"));
class NokDetect extends sequelize_1.Model {
    static associate() {
        NokDetect.belongsTo(product_1.default, {
            foreignKey: 'productId',
            as: 'product',
        });
        NokDetect.hasOne(nokAnalyse_1.default, {
            foreignKey: 'nokId',
        });
        NokDetect.belongsToMany(rework_1.default, {
            through: nokRework_1.default,
            foreignKey: 'nokDetectId',
            as: 'rework',
        });
    }
}
// define Product Model
NokDetect.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productSN: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    initNokCodeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    detectStationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    detectShiftId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    detectTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    nokStatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PENDING',
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    productStatus: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 'NOK',
    },
    removeReport: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    underscored: true,
    timestamps: false,
    modelName: 'nokDetect',
    sequelize: db_1.sequelize,
});
exports.default = NokDetect;
