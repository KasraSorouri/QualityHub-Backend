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
const types_1 = require("../modules/qualityHub/types");
module.exports = {
    up: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        (yield queryInterface.createTable('nok_reworks', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nok_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'nok_detects', key: 'id' },
            },
            rework_actions_id: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
                allowNull: true,
            },
            affected_recipes: {
                type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.INTEGER),
                allowNull: true,
            },
            rework_shift_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'work_shifts', key: 'id' },
            },
            rework_operator: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            rework_time: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            rework_duration: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            rework_man_power: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            rework_note: {
                type: sequelize_1.DataTypes.STRING,
            },
            rework_status: {
                type: sequelize_1.DataTypes.ENUM(...Object.values(types_1.ReworkStatus)),
                allowNull: false,
            },
        }),
            yield queryInterface.createTable('nok_dismantle_materials', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                nok_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    references: { model: 'nok_detects', key: 'id' },
                },
                rework_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    references: { model: 'nok_reworks', key: 'id' },
                },
                material_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: true,
                    references: { model: 'materials', key: 'id' },
                },
                qty: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: true,
                },
                reusable: {
                    type: sequelize_1.DataTypes.ENUM,
                    values: Object.values(types_1.Reusable),
                },
                recipe_bom_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: true,
                    references: { model: 'recipe_boms', key: 'id' },
                },
                material_status: {
                    type: sequelize_1.DataTypes.ENUM(...Object.values(types_1.MaterialStatus)),
                },
                claim_status: {
                    type: sequelize_1.DataTypes.ENUM,
                    values: Object.values(types_1.ClaimStatus),
                    allowNull: false,
                    defaultValue: types_1.ClaimStatus.PENDING,
                },
            }));
        yield queryInterface.createTable('nok_reworks_rework_actions', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nok_rework_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: 'nok_reworks', key: 'id' },
                onDelete: 'CASCADE',
            },
            rework_action_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: 'reworks', key: 'id' },
                onDelete: 'CASCADE',
            },
        });
        yield queryInterface.createTable('nok_reworks_affected_recipes', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nok_rework_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: 'nok_reworks', key: 'id' },
                onDelete: 'CASCADE',
            },
            affected_recipe_id: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: 'recipes', key: 'id' },
                onDelete: 'CASCADE',
            },
        });
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.dropTable('nok_dismantle_materials');
        yield queryInterface.dropTable('nok_reworks_rework_actions');
        yield queryInterface.dropTable('nok_reworks_affected_recipes');
        yield queryInterface.dropTable('nok_reworks');
        yield queryInterface.dropTable('enum_dismantle_materials_material_status');
    }),
};
