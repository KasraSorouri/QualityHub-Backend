"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NokCost = exports.NokRework_AffectedRecipes = exports.NokRework_ReworkActions = exports.ClassCode = exports.Rca = exports.RcaCode = exports.RwDismantledMaterials = exports.NokDismantleMaterials = exports.NokRework = exports.NokAnalyse = exports.NokDetect = exports.NokCode = exports.NokGrp = exports.Rework = exports.Machine = exports.RecipeBoms = exports.Recipe = exports.Material = exports.Customer = exports.Station = exports.WorkShift = exports.ProductGrp = exports.Product = exports.RoleRights = exports.UserRoles = exports.Right = exports.Role = exports.User = void 0;
const user_1 = __importDefault(require("./user"));
exports.User = user_1.default;
const role_1 = __importDefault(require("./role"));
exports.Role = role_1.default;
const right_1 = __importDefault(require("./right"));
exports.Right = right_1.default;
const userRoles_1 = __importDefault(require("./userRoles"));
exports.UserRoles = userRoles_1.default;
const roleRights_1 = __importDefault(require("./roleRights"));
exports.RoleRights = roleRights_1.default;
const product_1 = __importDefault(require("./product"));
exports.Product = product_1.default;
const productGrp_1 = __importDefault(require("./productGrp"));
exports.ProductGrp = productGrp_1.default;
const station_1 = __importDefault(require("./station"));
exports.Station = station_1.default;
const material_1 = __importDefault(require("./material"));
exports.Material = material_1.default;
const customer_1 = __importDefault(require("./customer"));
exports.Customer = customer_1.default;
const workShif_1 = __importDefault(require("./workShif"));
exports.WorkShift = workShif_1.default;
const recipe_1 = __importDefault(require("./recipe"));
exports.Recipe = recipe_1.default;
const recipeBoms_1 = __importDefault(require("./recipeBoms"));
exports.RecipeBoms = recipeBoms_1.default;
const nokCode_1 = __importDefault(require("./nokCode"));
exports.NokCode = nokCode_1.default;
const nokGrp_1 = __importDefault(require("./nokGrp"));
exports.NokGrp = nokGrp_1.default;
const nokDetect_1 = __importDefault(require("./nokDetect"));
exports.NokDetect = nokDetect_1.default;
const nokAnalyse_1 = __importDefault(require("./nokAnalyse"));
exports.NokAnalyse = nokAnalyse_1.default;
const rework_1 = __importDefault(require("./rework"));
exports.Rework = rework_1.default;
const nokRework_1 = __importDefault(require("./nokRework"));
exports.NokRework = nokRework_1.default;
const nokDismantleMaterials_1 = __importDefault(require("./nokDismantleMaterials"));
exports.NokDismantleMaterials = nokDismantleMaterials_1.default;
const rca_1 = __importDefault(require("./rca"));
exports.Rca = rca_1.default;
const rcaCode_1 = __importDefault(require("./rcaCode"));
exports.RcaCode = rcaCode_1.default;
const machine_1 = __importDefault(require("./machine"));
exports.Machine = machine_1.default;
const defectClass_1 = __importDefault(require("./defectClass"));
exports.ClassCode = defectClass_1.default;
const reworkDismantledMaterials_1 = __importDefault(require("./reworkDismantledMaterials"));
exports.RwDismantledMaterials = reworkDismantledMaterials_1.default;
const nokRework_ReworkActions_1 = __importDefault(require("./nokRework_ReworkActions"));
exports.NokRework_ReworkActions = nokRework_ReworkActions_1.default;
const nokRework_AffectedRecipes_1 = __importDefault(require("./nokRework_AffectedRecipes"));
exports.NokRework_AffectedRecipes = nokRework_AffectedRecipes_1.default;
const nokCost_1 = __importDefault(require("./nokCost"));
exports.NokCost = nokCost_1.default;
const claim_1 = __importDefault(require("./claim"));
const iqc_1 = __importDefault(require("./iqc"));
role_1.default.belongsToMany(user_1.default, { through: userRoles_1.default, foreignKey: 'roleId' });
user_1.default.belongsToMany(role_1.default, { through: userRoles_1.default, foreignKey: 'userId' });
right_1.default.belongsToMany(role_1.default, { through: roleRights_1.default, foreignKey: 'rightId' });
role_1.default.belongsToMany(right_1.default, { through: roleRights_1.default, foreignKey: 'roleId' });
// Qualiy Hub Moduly
product_1.default.belongsTo(productGrp_1.default, { foreignKey: 'productGrpId' });
productGrp_1.default.hasMany(product_1.default, { foreignKey: 'productGrpId' });
recipe_1.default.belongsTo(product_1.default, { foreignKey: 'productId' });
product_1.default.hasMany(recipe_1.default, { foreignKey: 'productId' });
recipe_1.default.belongsTo(station_1.default, { foreignKey: 'stationId' });
station_1.default.hasMany(recipe_1.default, { foreignKey: 'stationId' });
recipe_1.default.hasMany(recipeBoms_1.default, { as: 'recipeMaterials', foreignKey: 'recipeId' });
recipeBoms_1.default.belongsTo(recipe_1.default, { as: 'recipe', foreignKey: 'recipeId' });
material_1.default.hasMany(recipeBoms_1.default, { as: 'material', foreignKey: 'materialId' });
recipeBoms_1.default.belongsTo(material_1.default, { as: 'material', foreignKey: 'materialId' });
machine_1.default.belongsTo(station_1.default, { foreignKey: 'stationId' });
station_1.default.hasMany(machine_1.default, { foreignKey: 'stationId' });
recipe_1.default.belongsToMany(material_1.default, { through: recipeBoms_1.default, foreignKey: 'recipeId' });
material_1.default.belongsToMany(recipe_1.default, {
    through: recipeBoms_1.default,
    foreignKey: 'materialId',
});
// NOK Management
nokCode_1.default.belongsTo(nokGrp_1.default, { foreignKey: 'nokGrpId' });
nokGrp_1.default.hasMany(nokCode_1.default, { foreignKey: 'nokGrpId' });
nokDetect_1.default.belongsTo(nokCode_1.default, {
    foreignKey: 'initNokCodeId',
    as: 'initNokCode',
});
nokCode_1.default.hasMany(nokDetect_1.default, { foreignKey: 'initNokCodeId' });
nokDetect_1.default.belongsTo(product_1.default, { foreignKey: 'productId' });
product_1.default.hasMany(nokDetect_1.default, { foreignKey: 'productId' });
nokDetect_1.default.belongsTo(station_1.default, {
    foreignKey: 'detectStationId',
    as: 'detectedStation',
});
station_1.default.hasMany(nokDetect_1.default, { foreignKey: 'detectStationId' });
nokDetect_1.default.belongsTo(workShif_1.default, {
    foreignKey: 'detectShiftId',
    as: 'detectedShift',
});
workShif_1.default.hasMany(nokDetect_1.default, { foreignKey: 'detectShiftId' });
nokDetect_1.default.hasOne(nokAnalyse_1.default, { foreignKey: 'nokId' });
nokAnalyse_1.default.belongsTo(nokDetect_1.default, { foreignKey: 'nokId' });
nokDetect_1.default.hasMany(nokRework_1.default, { foreignKey: 'nokId' });
nokRework_1.default.belongsTo(nokDetect_1.default, { foreignKey: 'nokId' });
nokDetect_1.default.hasMany(nokDismantleMaterials_1.default, { foreignKey: 'nokId' });
nokDismantleMaterials_1.default.belongsTo(nokDetect_1.default, { foreignKey: 'nokId' });
nokDismantleMaterials_1.default.belongsTo(material_1.default, { foreignKey: 'materialId' });
nokAnalyse_1.default.belongsTo(nokCode_1.default, { foreignKey: 'nokCodeId' });
nokAnalyse_1.default.belongsTo(station_1.default, {
    foreignKey: 'causeStationId',
    as: 'causeStation',
});
nokAnalyse_1.default.belongsTo(workShif_1.default, {
    foreignKey: 'causeStationId',
    as: 'causeShift',
});
nokAnalyse_1.default.belongsTo(defectClass_1.default, { foreignKey: 'classCodeId', as: 'classCode' });
rca_1.default.belongsTo(nokDetect_1.default, { foreignKey: 'nokId' });
nokDetect_1.default.hasMany(rca_1.default, { foreignKey: 'nokId' });
rca_1.default.belongsTo(rcaCode_1.default, { foreignKey: 'rcaCodeId' });
rcaCode_1.default.hasMany(rca_1.default, { foreignKey: 'rcaCodeId' });
rework_1.default.belongsTo(product_1.default, { foreignKey: 'productId' });
product_1.default.hasMany(rework_1.default, { foreignKey: 'productId' });
rework_1.default.belongsTo(station_1.default, { foreignKey: 'stationId' });
station_1.default.hasMany(rework_1.default, { foreignKey: 'stationId' });
rework_1.default.belongsTo(nokCode_1.default, { foreignKey: 'nokCodeId' });
nokCode_1.default.hasMany(rework_1.default, { foreignKey: 'nokCodeId' });
rework_1.default.hasMany(reworkDismantledMaterials_1.default, { foreignKey: 'reworkId' });
reworkDismantledMaterials_1.default.belongsTo(rework_1.default, { foreignKey: 'reworkId' });
reworkDismantledMaterials_1.default.belongsTo(recipeBoms_1.default, { foreignKey: 'recipeBomId' });
recipeBoms_1.default.hasMany(reworkDismantledMaterials_1.default, { foreignKey: 'recipeBomId' });
nokDismantleMaterials_1.default.belongsTo(nokRework_1.default, { foreignKey: 'reworkId' });
nokRework_1.default.hasMany(nokDismantleMaterials_1.default, { foreignKey: 'reworkId' });
nokDismantleMaterials_1.default.belongsTo(reworkDismantledMaterials_1.default, {
    foreignKey: 'rwDismantledMaterialId',
});
reworkDismantledMaterials_1.default.hasMany(nokDismantleMaterials_1.default, {
    foreignKey: 'rwDismantledMaterialId',
});
nokDismantleMaterials_1.default.belongsTo(material_1.default, { foreignKey: 'materialId' });
material_1.default.hasMany(nokDismantleMaterials_1.default, { foreignKey: 'materialId' });
nokDismantleMaterials_1.default.belongsTo(nokDetect_1.default, { foreignKey: 'nokId' });
nokDetect_1.default.hasMany(nokDismantleMaterials_1.default, { foreignKey: 'nokId' });
nokDismantleMaterials_1.default.belongsTo(recipeBoms_1.default, { foreignKey: 'recipeBomId' });
recipeBoms_1.default.hasMany(nokDismantleMaterials_1.default, { foreignKey: 'recipeBomId' });
nokRework_1.default.belongsToMany(rework_1.default, {
    through: nokRework_ReworkActions_1.default,
    foreignKey: 'nokReworkId',
    as: 'reworkActions',
});
rework_1.default.belongsToMany(nokRework_1.default, {
    through: nokRework_ReworkActions_1.default,
    foreignKey: 'reworkActionId',
    as: 'reworkActions',
});
nokRework_1.default.belongsToMany(recipe_1.default, {
    through: nokRework_AffectedRecipes_1.default,
    foreignKey: 'nokReworkId',
});
recipe_1.default.belongsToMany(nokRework_1.default, {
    through: nokRework_AffectedRecipes_1.default,
    foreignKey: 'affectedRecipeId',
});
nokRework_1.default.belongsTo(workShif_1.default, {
    foreignKey: 'reworkShiftId',
    as: 'reworkShift',
});
workShif_1.default.hasMany(nokRework_1.default, {
    foreignKey: 'reworkShiftId',
    as: 'reworkShift',
});
nokRework_1.default.belongsTo(station_1.default, {
    foreignKey: 'reworkStationId',
    as: 'reworkStation',
});
station_1.default.hasMany(nokRework_1.default, {
    foreignKey: 'reworkStationId',
    as: 'reworkStation',
});
nokCost_1.default.belongsTo(nokRework_1.default, { foreignKey: 'reworkId' });
nokRework_1.default.hasMany(nokCost_1.default, { foreignKey: 'reworkId' });
nokCost_1.default.belongsTo(nokDetect_1.default, { foreignKey: 'nokId' });
nokDetect_1.default.hasMany(nokCost_1.default, { foreignKey: 'nokId' });
claim_1.default.belongsTo(nokDismantleMaterials_1.default, { foreignKey: 'dismantledMaterialId' });
nokDismantleMaterials_1.default.hasMany(claim_1.default, { foreignKey: 'dismantledMaterialId' });
iqc_1.default.belongsTo(nokDismantleMaterials_1.default, { foreignKey: 'dismantledMaterialId' });
nokDismantleMaterials_1.default.hasMany(iqc_1.default, { foreignKey: 'dismantledMaterialId' });
