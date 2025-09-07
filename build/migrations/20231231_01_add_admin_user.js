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
const dataProcessor_1 = require("../modules/usersAndAuthentication/utils/dataProcessor");
module.exports = {
    up: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        const userAdminExist = yield queryInterface.sequelize.query("SELECT * FROM users WHERE username = 'admin'", {
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (userAdminExist.length === 0) {
            yield queryInterface.bulkInsert('users', [
                {
                    username: 'admin',
                    password: yield (0, dataProcessor_1.passwordHashMaker)('secret'),
                    first_name: 'administrator',
                    last_name: '*',
                    active: true,
                    date_created: new Date(),
                },
            ], {});
        }
        const [roleAdminExist] = yield queryInterface.sequelize.query("SELECT * FROM roles WHERE role_name = 'Admin'", {
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (!roleAdminExist) {
            yield queryInterface.bulkInsert('roles', [
                {
                    role_name: 'Admin',
                    active: true,
                },
            ], {});
        }
        const [userAdmin] = yield queryInterface.sequelize.query("SELECT * FROM users WHERE username = 'admin'", {
            type: sequelize_1.QueryTypes.SELECT,
        });
        const [roleAdmin] = yield queryInterface.sequelize.query("SELECT * FROM roles WHERE role_name = 'Admin'", {
            type: sequelize_1.QueryTypes.SELECT,
        });
        console.log('user admin ->', userAdmin.id, '   * role admin ->', roleAdmin.id);
        yield queryInterface.bulkInsert('user_roles', [
            {
                user_id: userAdmin.id,
                role_id: roleAdmin.id,
            },
        ], {});
    }),
    down: (_a) => __awaiter(void 0, [_a], void 0, function* ({ context: queryInterface }) {
        const [userAdmin] = yield queryInterface.sequelize.query("SELECT * FROM users WHERE username = 'admin'", {
            type: sequelize_1.QueryTypes.SELECT,
        });
        if (userAdmin) {
            yield Promise.all([
                queryInterface.bulkDelete('user_roles', { user_id: userAdmin.id }, {}),
                queryInterface.bulkDelete('users', { username: 'admin' }, {}),
                queryInterface.bulkDelete('roles', { role_name: 'Admin' }, {}),
            ]);
        }
    }),
};
