import express from "express";

import { tokenExtractor, rightAuthority } from "../../usersAndAuthentication/utils/midwares";
import dashboardController from "../controllers/dashboard";


const router = express.Router();

// Get Dashboard Data
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/nok-params", tokenExtractor, rightAuthority(["DASHBOARD"]), dashboardController.NokDashboardController.getNokData);

export default router;