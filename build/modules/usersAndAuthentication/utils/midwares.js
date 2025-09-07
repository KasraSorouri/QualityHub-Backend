"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rightAuthority = exports.roleAuthority = exports.tokenExtractor = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../configs/config");
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('Authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        try {
            req.decodedToken = jsonwebtoken_1.default.verify(authorization.substring(7), config_1.SECRET);
        }
        catch (_a) {
            res.status(401).json({ error: 'token invalid!' });
        }
    }
    else {
        res.status(401).json({ error: 'token missing!' });
    }
    next();
};
exports.tokenExtractor = tokenExtractor;
//Authenticated based on Roles
const roleAuthority = (permitedRoles) => {
    return (req, res, next) => {
        var _a;
        if (!req.decodedToken) {
            return res.status(401).json({ error: 'Token not found!' });
        }
        const decodedToken = req.decodedToken;
        // Check if the decodedToken has a 'roles' property and it's an array of strings
        if (!Array.isArray(decodedToken.roles) || decodedToken.roles.some((role) => typeof role !== 'string')) {
            res.status(401).json({ error: 'Invalid roles in token!' });
        }
        // Convert user roles to UpperCase
        const userRoles = (_a = decodedToken.roles) === null || _a === void 0 ? void 0 : _a.map((role) => role.toUpperCase());
        if (!userRoles || userRoles.length < 1) {
            res.status(401).json({ error: 'Invalid roles in token!' });
            return; // Stop execution of the middleware function here. Don't call next()!
            //throw new Error('Invalid roles in token!');
        }
        // Check if any role matches the accepted roles
        const hasRole = permitedRoles.some((role) => userRoles.includes(role));
        if (!hasRole) {
            res.status(401).json({ error: 'Operation not allowed for This user' });
            //throw new Error('Operation not allowed for This user');
            //return; // Stop execution of the middleware function here. Don't call next()!
        }
        else {
            req.permited = true;
            return next();
        }
    };
};
exports.roleAuthority = roleAuthority;
//Authenticated based on Right
const rightAuthority = (permitedRights) => {
    return (req, res, next) => {
        var _a;
        if (!req.decodedToken) {
            return res.status(401).json({ error: 'Token not found!' });
        }
        const decodedToken = req.decodedToken;
        // Check if the decodedToken has a 'roles' property and it's an array of strings
        if (!Array.isArray(decodedToken.rights) || decodedToken.rights.some((right) => typeof right !== 'string')) {
            res.status(401).json({ error: 'Invalid right in token!' });
        }
        // Convert user roles to UpperCase
        const userRights = (_a = decodedToken.rights) === null || _a === void 0 ? void 0 : _a.map((right) => right.toUpperCase());
        if (!userRights || userRights.length < 1) {
            res.status(401).json({ error: 'Invalid Rights in token!' });
            return; // Stop execution of the middleware function here. Don't call next()!
        }
        // Check if any role matches the accepted roles
        const hasRight = permitedRights.some((right) => userRights.includes(right));
        if (!hasRight) {
            res.status(401).json({ error: 'This user has not sufficient  rights' });
        }
        req.permited = true;
        return next();
    };
};
exports.rightAuthority = rightAuthority;
