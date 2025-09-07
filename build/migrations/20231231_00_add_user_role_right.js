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
        yield queryInterface.createTable('users', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                unique: true,
            },
            password: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            first_name: {
                type: sequelize_1.DataTypes.TEXT,
            },
            last_name: {
                type: sequelize_1.DataTypes.TEXT,
            },
            email: {
                type: sequelize_1.DataTypes.TEXT,
                unique: true,
            },
            phone: {
                type: sequelize_1.DataTypes.TEXT,
            },
            active: {
                type: sequelize_1.DataTypes.BOOLEAN,
            },
            date_created: {
                type: sequelize_1.DataTypes.DATE,
            },
        });
        yield queryInterface.createTable('roles', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            role_name: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                unique: true,
            },
            active: {
                type: sequelize_1.DataTypes.BOOLEAN,
            },
        });
        yield queryInterface.createTable('rights', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            right: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                unique: true,
            },
            related_module: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
        });
        yield queryInterface.createTable('user_roles', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            role_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        });
        yield queryInterface.createTable('role_rights', {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            role_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            right_id: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        });
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.dropTable('users');
        yield queryInterface.dropTable('roles');
        yield queryInterface.dropTable('rights');
        yield queryInterface.dropTable('user_roles');
        yield queryInterface.dropTable('role_rights');
    }),
};
