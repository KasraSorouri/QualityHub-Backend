"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// *** Import Routers
// import Authentication and User Routes
const users_1 = __importDefault(require("./modules/usersAndAuthentication/routes/users"));
const roles_1 = __importDefault(require("./modules/usersAndAuthentication/routes/roles"));
const rights_1 = __importDefault(require("./modules/usersAndAuthentication/routes/rights"));
const login_1 = __importDefault(require("./modules/usersAndAuthentication/routes/login"));
// import Quality hub Routes
const product_1 = __importDefault(require("./modules/qualityHub/routes/product"));
const productGrps_1 = __importDefault(require("./modules/qualityHub/routes/productGrps"));
const workShifts_1 = __importDefault(require("./modules/qualityHub/routes/workShifts"));
const stations_1 = __importDefault(require("./modules/qualityHub/routes/stations"));
const materials_1 = __importDefault(require("./modules/qualityHub/routes/materials"));
const machines_1 = __importDefault(require("./modules/qualityHub/routes/machines"));
const recipes_1 = __importDefault(require("./modules/qualityHub/routes/recipes"));
const reworks_1 = __importDefault(require("./modules/qualityHub/routes/reworks"));
const nokGrps_1 = __importDefault(require("./modules/qualityHub/routes/nokGrps"));
const nokCodes_1 = __importDefault(require("./modules/qualityHub/routes/nokCodes"));
const rcaCodes_1 = __importDefault(require("./modules/qualityHub/routes/rcaCodes"));
const classCodes_1 = __importDefault(require("./modules/qualityHub/routes/classCodes"));
const nokDetect_1 = __importDefault(require("./modules/qualityHub/routes/nokDetect"));
const nokReworks_1 = __importDefault(require("./modules/qualityHub/routes/nokReworks"));
const nokCosts_1 = __importDefault(require("./modules/qualityHub/routes/nokCosts"));
const nokRCAs_1 = __importDefault(require("./modules/qualityHub/routes/nokRCAs"));
const nokAnalyses_1 = __importDefault(require("./modules/qualityHub/routes/nokAnalyses"));
const claimManager_1 = __importDefault(require("./modules/qualityHub/routes/claimManager"));
const iqcManager_1 = __importDefault(require("./modules/qualityHub/routes/iqcManager"));
const dashbord_1 = __importDefault(require("./modules/qualityHub/routes/dashbord"));
const app = (0, express_1.default)();
app.use(express_1.default.json(), (0, cors_1.default)());
// Authentication and User Routes
app.use('/api/auth/users', users_1.default);
app.use('/api/auth/roles', roles_1.default);
app.use('/api/auth/rights', rights_1.default);
app.use('/api/auth/login', login_1.default);
// Quality hub Routes
app.use('/api/quality/products', product_1.default);
app.use('/api/quality/product_grps', productGrps_1.default);
app.use('/api/quality/shifts', workShifts_1.default);
app.use('/api/quality/stations', stations_1.default);
app.use('/api/quality/materials', materials_1.default);
app.use('/api/quality/recipes', recipes_1.default);
app.use('/api/quality/machines', machines_1.default);
app.use('/api/quality/reworks', reworks_1.default);
app.use('/api/quality/nok_grps', nokGrps_1.default);
app.use('/api/quality/nok_codes', nokCodes_1.default);
app.use('/api/quality/rca_codes', rcaCodes_1.default);
app.use('/api/quality/class_codes', classCodes_1.default);
app.use('/api/quality/nok_detect', nokDetect_1.default);
app.use('/api/quality/nok_rework', nokReworks_1.default);
app.use('/api/quality/nok_costs', nokCosts_1.default);
app.use('/api/quality/nok_rcas', nokRCAs_1.default);
app.use('/api/quality/nok_analyses', nokAnalyses_1.default);
app.use('/api/quality/claims', claimManager_1.default);
app.use('/api/quality/iqcs', iqcManager_1.default);
app.use('/api/quality/dashboard', dashbord_1.default);
app.get('/api/ping', (_req, res) => {
    res.send('Pong!');
});
exports.default = app;
