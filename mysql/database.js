"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var mysql2_1 = __importDefault(require("mysql2"));
var database = require('./keys').database;
var pool = mysql2_1["default"].createPool(database);
var promisify = require('util').promisify;
pool.getConnection(function (err, conn) {
    if (err) {
        console.log(err);
    }
    if (conn)
        conn.release();
    console.log('\x1b[32m%s\x1b[0m', '✓ The DB is connected successfully');
    return;
});
//convert to promiseto has callback
pool.query = promisify(pool.query);
module.exports = pool;
//# sourceMappingURL=database.js.map