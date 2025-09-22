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
const claimManager_1 = __importDefault(require("../services/claimManager"));
// Get All Claims
const getAllClaims = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claims = yield claimManager_1.default.getAllClaims();
        res.json(claims);
    }
    catch (err) {
        res.status(400).json({ error: 'No Claim found' });
    }
});
// Get Pending Claims
const getPendingClaims = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claims = yield claimManager_1.default.getPendingClaims();
        res.json(claims);
    }
    catch (err) {
        res.status(400).json({ error: 'No Claim found' });
    }
});
// Update Claim Status
const updateClaimStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const claimData = req.body;
    try {
        const claim = yield claimManager_1.default.updateClaimStatus(Number(id), claimData);
        res.json(claim);
    }
    catch (err) {
        res.status(400).json({ error: 'Claim not found' });
    }
});
exports.default = {
    getAllClaims,
    getPendingClaims,
    updateClaimStatus,
};
