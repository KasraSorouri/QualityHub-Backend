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
        (yield queryInterface.createTable('nok_detects', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            product_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'products', key: 'id' },
            },
            product_s_n: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            init_nok_code_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'nok_codes', key: 'id' },
            },
            detect_station_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'stations', key: 'id' },
            },
            detect_shift_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'work_shifts', key: 'id' },
            },
            detect_time: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize_1.DataTypes.NOW,
            },
            nok_status: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                defaultValue: 'PENDING',
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
            },
            product_status: {
                type: sequelize_1.DataTypes.STRING,
                defaultValue: 'NOK',
            },
            remove_report: {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false,
            },
        }),
            yield queryInterface.createTable('nok_analyses', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                nok_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    unique: true,
                },
                nok_code_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
                cause_station_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
                cause_shift_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
                description: {
                    type: sequelize_1.DataTypes.STRING,
                },
                time_waste: {
                    type: sequelize_1.DataTypes.INTEGER,
                },
                material_waste: {
                    type: sequelize_1.DataTypes.INTEGER,
                },
                closed: {
                    type: sequelize_1.DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                close_date: {
                    type: sequelize_1.DataTypes.DATE,
                },
                updated_by: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    references: { model: 'users', key: 'id' },
                },
                updated_at: {
                    type: sequelize_1.DataTypes.DATE,
                    defaultValue: sequelize_1.DataTypes.NOW,
                },
            }));
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.dropTable('nok_detects');
        yield queryInterface.dropTable('nok_analyses');
    }),
};
