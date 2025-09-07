"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReworkStatus = exports.RecipeType = exports.ClaimStatus = exports.MaterialStatus = exports.ProductStatus = exports.NokStatus = exports.Reusable = void 0;
var Reusable;
(function (Reusable) {
    Reusable["YES"] = "YES";
    Reusable["NO"] = "NO";
    Reusable["IQC"] = "IQC";
})(Reusable || (exports.Reusable = Reusable = {}));
var NokStatus;
(function (NokStatus) {
    NokStatus["PENDING"] = "PENDING";
    NokStatus["ANALYSED"] = "ANALYSED";
    NokStatus["NEED_INVESTIGATION"] = "NEED INVESTIGATION";
    NokStatus["NOT_FOUND"] = "NOT FOUND";
})(NokStatus || (exports.NokStatus = NokStatus = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["NOK"] = "NOK";
    ProductStatus["REWORK_INPROGRESS"] = "REWORK IN PROGRESS";
    ProductStatus["REWORKED"] = "REWORKED";
    ProductStatus["SCRAPPED"] = "SCRAPPED";
})(ProductStatus || (exports.ProductStatus = ProductStatus = {}));
var MaterialStatus;
(function (MaterialStatus) {
    MaterialStatus["OK"] = "OK";
    MaterialStatus["SCRAPPED"] = "SCRAPPED";
    MaterialStatus["IQC"] = "IQC";
    MaterialStatus["CLAIMABLE"] = "CLAIMABLE";
})(MaterialStatus || (exports.MaterialStatus = MaterialStatus = {}));
var ClaimStatus;
(function (ClaimStatus) {
    ClaimStatus["PENDING"] = "PENDING";
    ClaimStatus["ACCEPTED"] = "ACCEPTED";
    ClaimStatus["DENIED"] = "DENIED";
})(ClaimStatus || (exports.ClaimStatus = ClaimStatus = {}));
var RecipeType;
(function (RecipeType) {
    RecipeType["PRODUCTION"] = "PRODUCTION";
    RecipeType["REWORK"] = "REWORK";
})(RecipeType || (exports.RecipeType = RecipeType = {}));
var ReworkStatus;
(function (ReworkStatus) {
    ReworkStatus["PENDING"] = "PENDING";
    ReworkStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ReworkStatus["POSTPONED"] = "POSTPONED";
    ReworkStatus["COMPLETED"] = "COMPLETED";
    ReworkStatus["CANCELLED"] = "CANCELLED";
})(ReworkStatus || (exports.ReworkStatus = ReworkStatus = {}));
