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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../../models");
const claim_1 = __importDefault(require("../../../models/claim"));
const dataProcessor_1 = require("../utils/dataProcessor");
const query = {
    attributes: { exclude: [] },
    include: [
        {
            model: models_1.Material,
            as: 'material',
            attributes: ['id', 'itemShortName', 'itemLongName', 'itemCode', 'price', 'unit', 'traceable', 'active'],
        },
        {
            model: models_1.NokDetect,
            as: 'nokDetect',
            attributes: ['productSN', 'detectTime', 'description', 'productStatus', 'productId', 'detectShiftId'],
            include: [
                {
                    model: models_1.WorkShift,
                    as: 'detectedShift',
                    attributes: ['shiftCode'],
                },
                {
                    model: models_1.Product,
                    as: 'product',
                    attributes: ['productName', 'productCode'],
                },
            ],
        },
    ],
};
// Get all Claims
const getAllClaims = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claims = yield models_1.NokDismantleMaterials.findAll({
            where: {
                materialStatus: 'CLAIMABLE',
            },
            attributes: query.attributes,
            include: query.include,
        });
        return claims;
    }
    catch (err) {
        throw new Error('No Claims found');
    }
});
// Get Pending Claims
const getPendingClaims = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claims = yield models_1.NokDismantleMaterials.findAll({
            where: {
                materialStatus: 'CLAIMABLE',
                claimStatus: 'PENDING',
            },
            attributes: query.attributes,
            include: query.include,
        });
        return claims;
    }
    catch (err) {
        throw new Error('No Claims found');
    }
});
// Update Claim Status
const updateClaimStatus = (claimId, claimData) => __awaiter(void 0, void 0, void 0, function* () {
    const newClaimData = (0, dataProcessor_1.claimStatusProcessor)(claimData);
    try {
        const claimed = yield models_1.NokDismantleMaterials.findByPk(claimId);
        if (!claimed) {
            throw new Error('Claim not found');
        }
        claimed.claimStatus = newClaimData.claimStatus;
        yield claimed.save();
        const { claimStatus: _ } = newClaimData, claimData = __rest(newClaimData, ["claimStatus"]);
        yield claim_1.default.upsert(claimData);
        return true;
    }
    catch (err) {
        throw new Error('Claim not found');
    }
});
exports.default = {
    getAllClaims,
    getPendingClaims,
    updateClaimStatus,
};
