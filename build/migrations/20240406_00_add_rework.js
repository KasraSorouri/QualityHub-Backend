"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.createTable('reworks', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            product_id: {
                type: sequelize_1.DataTypes.INTEGER,
                References: { model: 'products', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            nok_code_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                References: { model: 'nok_codes', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            station_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                References: { model: 'stations', key: 'id' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            rework_short_desc: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
            },
            order: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            rework_recipes: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
                References: { model: 'recipes', key: 'id' },
            },
            affected_recipes: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
                References: { model: 'recipes', key: 'id' },
            },
            active: {
                type: sequelize_1.DataTypes.BOOLEAN,
            },
            deprecated: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
            time_duration: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            creation_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            deprecated_date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
            },
        });
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.dropTable('reworks');
    }),
};
