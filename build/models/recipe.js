"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
const station_1 = __importDefault(require("./station"));
const product_1 = __importDefault(require("./product"));
const recipeBoms_1 = __importDefault(require("./recipeBoms"));
const material_1 = __importDefault(require("./material"));
class Recipe extends sequelize_1.Model {
    static associate() {
        Recipe.belongsTo(product_1.default, {
            foreignKey: 'productId',
            as: 'product',
        });
        Recipe.belongsTo(station_1.default, {
            foreignKey: 'stationId',
            as: 'station',
        });
        Recipe.belongsToMany(material_1.default, {
            through: recipeBoms_1.default,
            foreignKey: 'recipeId',
            as: 'material',
        });
    }
}
// define Product Model
Recipe.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    recipeCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    active: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    productId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    stationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    timeDuration: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    manpower: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    recipeType: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: 'PRODUCTION',
    },
}, {
    underscored: true,
    timestamps: false,
    modelName: 'recipe',
    sequelize: db_1.sequelize,
});
exports.default = Recipe;
