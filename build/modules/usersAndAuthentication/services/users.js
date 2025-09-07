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
const models_1 = require("../../../models");
const dataProcessor_1 = require("../utils/dataProcessor");
// Define User query
const query = {
    attributes: { exclude: ['password', 'userRoles'] },
    include: [
        {
            model: models_1.Role,
            as: 'roles',
            attributes: ['id', 'roleName', 'active'],
            through: {
                attributes: [],
            },
            include: [
                {
                    model: models_1.Right,
                    as: 'rights',
                    attributes: ['id', 'right'],
                    through: {
                        attributes: [],
                    },
                },
            ],
        },
    ],
};
// Get all Users
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.User.findAll(query);
    return users;
});
// Get a User based on ID
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findByPk(id, query);
    if (!user) {
        throw new Error('the user not found');
    }
    return user;
});
// Create a new User
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserData = yield (0, dataProcessor_1.userProcessor)(userData);
    if ('password' in newUserData) {
        try {
            const newUser = yield models_1.User.create(newUserData);
            if ('roles' in newUserData && newUserData.roles) {
                const { roles } = newUserData;
                const updatedUser = yield updateUserRoles(newUser.id, roles);
                return updatedUser;
            }
            else {
                return newUser;
            }
        }
        catch (err) {
            let errorMessage = '';
            if (err instanceof Error) {
                errorMessage += ' Error: ' + err.message;
            }
            throw new Error(errorMessage);
        }
    }
    else {
        throw new Error('Incorrect or missing data!');
    }
});
// Update an User
const updateUser = (id, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserData = yield (0, dataProcessor_1.userProcessor)(userData);
    try {
        const user = yield models_1.User.findByPk(id);
        if (!user) {
            throw new Error('User not found!');
        }
        yield user.update(newUserData);
        if ('roles' in newUserData && newUserData.roles) {
            const { roles } = newUserData;
            const updatedUser = yield updateUserRoles(id, roles);
            return updatedUser;
        }
        else {
            return user;
        }
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Assign Roles to a User
const updateUserRoles = (id, roles) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findByPk(id);
    if (!user) {
        throw new Error('user not found');
    }
    /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call */
    yield user.setRoles([]);
    const okRoles = yield models_1.Role.findAll({
        where: { id: [...roles], active: true },
    });
    try {
        /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call */
        yield user.addRoles(okRoles);
        const updatedUser = yield models_1.User.findByPk(id, query);
        if (!updatedUser) {
            throw new Error('the user not found');
        }
        return updatedUser;
    }
    catch (err) {
        let errorMessage = 'Something went wrong. Check user\'s roles again';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
exports.default = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
};
