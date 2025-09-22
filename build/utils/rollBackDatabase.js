"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../configs/db");
const logger_1 = __importDefault(require("./logger"));
(0, db_1.rollbackMigration)()
    .catch((error) => {
    if (error instanceof Error) {
        logger_1.default.info('Failed to rollback migration', error.message);
    }
    else {
        logger_1.default.info('Failed to rollback migration', String(error));
    }
    process.exit(1);
})
    .finally(() => {
    process.exit(0);
});
