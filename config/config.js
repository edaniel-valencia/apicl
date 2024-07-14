const mysql = require('mysql2');


const db = mysql.createConnection({
        host: "db-tse-udemy.cxfnthr4dqip.us-east-1.rds.amazonaws.com",
          user: 'admin',
          password: 'db-tse-udemy',
          database: 'udemy_test'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;
