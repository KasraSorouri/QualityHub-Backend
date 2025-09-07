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
        (yield queryInterface.createTable('materials', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            item_short_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            item_long_name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            item_code: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            price: {
                type: sequelize_1.DataTypes.DECIMAL,
            },
            unit: {
                type: sequelize_1.DataTypes.STRING,
            },
            active: {
                type: sequelize_1.DataTypes.BOOLEAN,
            },
        }),
            yield queryInterface.createTable('recipes', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                recipe_code: {
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
                product_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    references: { model: 'products', key: 'id' },
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
                station_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    references: { model: 'stations', key: 'id' },
                },
                time_duration: {
                    type: sequelize_1.DataTypes.INTEGER,
                },
                manpower: {
                    type: sequelize_1.DataTypes.INTEGER,
                },
                recipe_type: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    defaultValue: 'PRODUCTION',
                },
            }));
        yield queryInterface.createTable('recipe_boms', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            qty: {
                type: sequelize_1.DataTypes.INTEGER,
            },
            recipe_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'recipes', key: 'id' },
            },
            material_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'materials', key: 'id' },
            },
            reusable: {
                type: sequelize_1.DataTypes.ENUM('YES', 'NO', 'IQC'),
            },
        });
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.dropTable('recipe_boms');
        yield queryInterface.dropTable('recipes');
        yield queryInterface.dropTable('materials');
    }),
};
