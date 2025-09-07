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
// Define role query
const query = {
    include: [
        {
            model: models_1.Right,
            as: 'rights',
            attributes: ['id', 'right', 'relatedModule'],
            through: {
                attributes: [],
            },
        },
    ],
    attributes: {
        exclude: [],
    },
};
// Get All roles
const getAllRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const roles = yield models_1.Role.findAll(query);
    return roles;
});
// Get a role based on ID
const getRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const role = yield models_1.Role.findByPk(id, query);
    if (!role) {
        throw new Error('the role not found');
    }
    const result = {
        id: role.id,
        roleName: role.roleName,
        active: role.active,
        rights: (_a = role.rights) === null || _a === void 0 ? void 0 : _a.map((right) => right.right),
    };
    return result;
});
// Create a new role
const createRole = (roleData) => __awaiter(void 0, void 0, void 0, function* () {
    const newRoleData = (0, dataProcessor_1.roleProcessor)(roleData);
    const { roleName, active } = newRoleData;
    try {
        const newRole = yield models_1.Role.create({ roleName, active });
        return newRole;
    }
    catch (err) {
        let errorMessage = 'Something went wrong.';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
// Update a Role
const updateRole = (id, roleData) => __awaiter(void 0, void 0, void 0, function* () {
    const newRoleData = (0, dataProcessor_1.roleProcessor)(roleData);
    try {
        const role = yield models_1.Role.findByPk(id);
        if (!role) {
            throw new Error('Role not found!');
        }
        // update Role
        yield role.update(newRoleData);
        // update rights
        const updatedRole = yield updateRoleRights(id, newRoleData.rights);
        return updatedRole;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
const updateRoleRights = (id, rights) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield models_1.Role.findByPk(id);
    const okRights = yield models_1.Right.findAll({ where: { id: [...rights] } });
    if (!role) {
        throw new Error('role not found');
    }
    // remove old rights from role
    yield role.setRights([]);
    try {
        yield role.setRights(okRights);
        const updatedRole = yield models_1.Role.findByPk(id, {
            include: [
                {
                    model: models_1.Right,
                    attributes: ['id', 'right', 'relatedModule'],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        if (!updatedRole) {
            throw new Error('role not found');
        }
        return updatedRole;
    }
    catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
            errorMessage += ' Error: ' + err.message;
        }
        throw new Error(errorMessage);
    }
});
exports.default = {
    getAllRoles,
    getRole,
    createRole,
    updateRole,
};
