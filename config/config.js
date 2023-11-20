const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1004',
//      database: 'ecommerce'
// });
const db = mysql.createConnection({
        host: "localhost",
          user: 'root',
          password: '1004',
          database: 'ecommerce'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;