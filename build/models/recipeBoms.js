"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../configs/db");
const recipe_1 = __importDefault(require("./recipe"));
const material_1 = __importDefault(require("./material"));
const types_1 = require("../modules/qualityHub/types");
class RecipeBoms extends sequelize_1.Model {
    static associate() {
        RecipeBoms.belongsTo(recipe_1.default, { foreignKey: 'recipeId' });
        RecipeBoms.belongsTo(material_1.default, { foreignKey: 'materialId' });
    }
}
RecipeBoms.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    recipeId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'products', key: 'id' },
    },
    materialId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'boms', key: 'id' },
    },
    qty: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    reusable: {
        type: sequelize_1.DataTypes.ENUM,
        values: Object.values(types_1.Reusable),
    },
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'recipeBoms',
});
exports.default = RecipeBoms;
