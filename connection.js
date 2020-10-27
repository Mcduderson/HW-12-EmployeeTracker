//requiring mysql
const mysql = require("mysql");

//created a constructor function to house connection and the mehods to be used.
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

//created the db as a new class to be used elsewhere.
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Tigerseye05!6",
    database: "employees_DB"
});

// exporting the db for use
module.exports = db;