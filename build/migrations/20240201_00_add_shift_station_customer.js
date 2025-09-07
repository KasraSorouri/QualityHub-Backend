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
        (yield queryInterface.createTable('work_shifts', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            shift_name: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                unique: true,
            },
            shift_code: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                unique: true,
            },
            active: {
                type: sequelize_1.DataTypes.BOOLEAN,
            },
        }),
            yield queryInterface.createTable('customers', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                name: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: false,
                    unique: true,
                },
                customer_code: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: false,
                    unique: true,
                },
                email: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: false,
                },
                phone: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: false,
                },
                address: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: false,
                },
                active: {
                    type: sequelize_1.DataTypes.BOOLEAN,
                },
            }),
            yield queryInterface.createTable('stations', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                station_name: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: false,
                    unique: true,
                },
                station_code: {
                    type: sequelize_1.DataTypes.TEXT,
                    allowNull: false,
                    unique: true,
                },
                description: {
                    type: sequelize_1.DataTypes.TEXT,
                },
                active: {
                    type: sequelize_1.DataTypes.BOOLEAN,
                },
            }));
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.dropTable('work_shifts');
        yield queryInterface.dropTable('customers');
        yield queryInterface.dropTable('stations');
    }),
};
