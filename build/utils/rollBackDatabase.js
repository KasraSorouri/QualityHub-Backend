"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../configs/db");
(0, db_1.rollbackMigration)().catch((error) => {
    console.error('Failed to rollback migration', error);
    process.exit(1);
}).finally(() => {
    process.exit(0);
});
