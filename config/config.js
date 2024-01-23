const mysql = require('mysql2');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1004',
//      database: 'ecommerce'
// });
const db = mysql.createConnection({
        host: "database-tienda-virtual.cxfnthr4dqip.us-east-1.rds.amazonaws.com",
          user: 'admin',
          password: '3dxuy3lvxl398',
          database: 'cyber-link'
});

db.connect(function(err) {
    if (err) throw err;
    console.log('DATABASE CONNECTED!');
});

module.exports = db;
