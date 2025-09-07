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
        (yield queryInterface.createTable('rca_codes', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            rca_code: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            rca_desc: {
                type: sequelize_1.DataTypes.STRING,
            },
            active: {
                type: sequelize_1.DataTypes.BOOLEAN,
            },
        }),
            yield queryInterface.createTable('rcas', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                rca_code_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    references: { model: 'rca_codes', key: 'id' },
                    onUpdate: 'CASCADE',
                },
                nok_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    references: { model: 'nok_detects', key: 'id' },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                wh_cause_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                },
                wh_cause_name: {
                    type: sequelize_1.DataTypes.STRING,
                },
                description: {
                    type: sequelize_1.DataTypes.STRING,
                },
                improve_suggestion: {
                    type: sequelize_1.DataTypes.STRING,
                },
                create_by: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                },
                created_at: {
                    type: sequelize_1.DataTypes.DATE,
                    defaultValue: sequelize_1.DataTypes.NOW,
                },
            }));
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.dropTable('rcas');
        yield queryInterface.dropTable('rca_codes');
    }),
};
