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
        yield queryInterface.addColumn('nok_reworks', 'lock_edit', {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        });
        yield queryInterface.addColumn('nok_reworks', 'used_material_cost', {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        });
        yield queryInterface.addColumn('nok_reworks', 'dismantled_material_cost', {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        });
        yield queryInterface.addColumn('nok_reworks', 'recipes_wasted_time', {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 0,
        });
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        yield queryInterface.removeColumn('nok_reworks', 'lock_edit');
        yield queryInterface.removeColumn('nok_reworks', 'used_material_cost');
        yield queryInterface.removeColumn('nok_reworks', 'dismantled_material_cost');
        yield queryInterface.removeColumn('nok_reworks', 'recipes_wasted_time');
    }),
};
