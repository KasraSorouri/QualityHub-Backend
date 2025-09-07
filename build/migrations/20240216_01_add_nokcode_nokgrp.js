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
        (yield queryInterface.createTable('nok_grps', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nok_grp_name: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                unique: true,
            },
            nok_grp_code: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                unique: true,
            },
            nok_grp_desc: {
                type: sequelize_1.DataTypes.TEXT,
            },
            active: {
                type: sequelize_1.DataTypes.BOOLEAN,
            },
        }),
            yield queryInterface.createTable('nok_codes', {
                id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                nok_code: {
                    type: sequelize_1.DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                nok_desc: {
                    type: sequelize_1.DataTypes.STRING,
                },
                active: {
                    type: sequelize_1.DataTypes.BOOLEAN,
                },
                nok_grp_id: {
                    type: sequelize_1.DataTypes.INTEGER,
                    allowNull: false,
                    references: { model: 'nok_grps', key: 'id' },
                },
            }));
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.dropTable('nok_grps');
        yield queryInterface.dropTable('nok_codes');
    }),
};
