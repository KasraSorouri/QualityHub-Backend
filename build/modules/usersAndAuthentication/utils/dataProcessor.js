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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordHashMaker = exports.credentialsProcessor = exports.parseRoleResponse = exports.parseUserResponse = exports.rightProcessor = exports.roleProcessor = exports.userProcessor = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dataValidator_1 = require("../../../utils/dataValidator");
const parseUsername = (username) => {
    if (!(0, dataValidator_1.isString)(username) || !(0, dataValidator_1.stringLengthCheck)(username, 3, 'username')) {
        throw new Error('Incorrect username!');
    }
    return username;
};
const parseFirstName = (firstName) => {
    if (!(0, dataValidator_1.isString)(firstName)) {
        throw new Error('Incorrect firstName!');
    }
    return firstName;
};
const parseLastName = (lastName) => {
    if (!(0, dataValidator_1.isString)(lastName)) {
        throw new Error('Incorrect lastName!');
    }
    return lastName;
};
const parseEmail = (email) => {
    if (!(0, dataValidator_1.isString)(email) || !(0, dataValidator_1.stringLengthCheck)(email, 3, 'email')) {
        throw new Error('Incorrect email!');
    }
    return email;
};
const parsePhone = (phone) => {
    if (!(0, dataValidator_1.isString)(phone) || !(0, dataValidator_1.stringLengthCheck)(phone, 3, 'phone')) {
        throw new Error('Incorrect phone!');
    }
    return phone;
};
const parseActive = (active) => {
    if (!(0, dataValidator_1.isBoolean)(active)) {
        throw new Error('Incorrect or missing data!');
    }
    return active;
};
const parsePassword = (password) => {
    if (!password || !(0, dataValidator_1.isString)(password) || !(0, dataValidator_1.stringLengthCheck)(password, 6, 'password')) {
        throw new Error('Incorrect password!');
    }
    return password;
};
const passwordHashMaker = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRound = 10;
    const passwordhash = bcrypt_1.default.hash(password, saltRound);
    return passwordhash;
});
exports.passwordHashMaker = passwordHashMaker;
const parseRoleName = (roleName) => {
    if (!(0, dataValidator_1.isString)(roleName)) {
        throw new Error('Incorrect firstName!');
    }
    return roleName;
};
const parseRightName = (right) => {
    if (!(0, dataValidator_1.isString)(right)) {
        throw new Error('Incorrect Right name!');
    }
    return right;
};
const parseRelatedModule = (module) => {
    if (!(0, dataValidator_1.isString)(module)) {
        throw new Error('Incorrect Related Module!');
    }
    return module;
};
const parseRoles = (array) => {
    if (!Array.isArray(array)) {
        throw new Error('Roles should be Array!');
    }
    if (!array || typeof array !== 'object') {
        throw new Error('Incorrect or Missing data!');
    }
    const roles = [];
    array.forEach((element) => {
        (0, dataValidator_1.isNumber)(element) ? roles.push(element) : null;
    });
    return roles;
};
const userProcessor = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userData || typeof userData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('username' in userData && 'firstName' in userData && 'lastName' in userData) {
        const newUser = {
            username: parseUsername(userData.username),
            firstName: parseFirstName(userData.firstName),
            lastName: parseLastName(userData.lastName),
            email: 'email' in userData ? parseEmail(userData.email) : '',
            phone: 'phone' in userData ? parsePhone(userData.phone) : '',
            active: 'active' in userData ? parseActive(userData.active) : false,
        };
        if ('password' in userData && userData.password) {
            newUser.password = yield passwordHashMaker(parsePassword(userData.password));
        }
        if ('roles' in userData) {
            newUser.roles = parseRoles(userData.roles);
        }
        return newUser;
    }
    else {
        throw new Error('Data is missing');
    }
});
exports.userProcessor = userProcessor;
const credentialsProcessor = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect username or password!');
    }
    if ('username' in object && 'password' in object && (0, dataValidator_1.isString)(object.username) && (0, dataValidator_1.isString)(object.password)) {
        const credential = {
            username: object.username,
            password: object.password,
        };
        return credential;
    }
    throw new Error('Incorrect username or password!');
};
exports.credentialsProcessor = credentialsProcessor;
const roleProcessor = (roleData) => {
    if (!roleData || typeof roleData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('roleName' in roleData && 'active' in roleData) {
        const newRole = {
            roleName: parseRoleName(roleData.roleName),
            active: roleData.active ? parseActive(roleData.active) : false,
            rights: 'rights' in roleData && roleData.rights && Array.isArray(roleData.rights) ? parseRoles(roleData.rights) : [],
        };
        if ('rights' in roleData) {
            newRole.rights = parseRoles(roleData.rights);
        }
        else {
            newRole.rights = [];
        }
        return newRole;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.roleProcessor = roleProcessor;
const rightProcessor = (rightData) => {
    if (!rightData || typeof rightData !== 'object') {
        throw new Error('Incorrect or missing Data!');
    }
    if ('right' in rightData && 'relatedModule' in rightData) {
        const newRight = {
            right: parseRightName(rightData.right),
            relatedModule: parseRelatedModule(rightData.relatedModule),
        };
        return newRight;
    }
    else {
        throw new Error('Data is missing');
    }
};
exports.rightProcessor = rightProcessor;
const parseUserResponse = (userData) => {
    var _a, _b;
    return {
        id: userData.id,
        username: userData.username,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        active: userData.active,
        roles: userData.roles ? userData.roles.map((role) => role.roleName) : [],
        rights: ((_b = (_a = userData.roles) === null || _a === void 0 ? void 0 : _a.flatMap((role) => { var _a; return (_a = role.rights) === null || _a === void 0 ? void 0 : _a.map((right) => right.right); })) !== null && _b !== void 0 ? _b : []).filter((right) => typeof right === 'string'),
    };
};
exports.parseUserResponse = parseUserResponse;
const parseRoleResponse = (roleData) => {
    return {
        id: roleData.id,
        roleName: roleData.roleName,
        active: roleData.active,
        rights: roleData.rights ? roleData.rights.map((role) => role.right) : [],
    };
};
exports.parseRoleResponse = parseRoleResponse;
