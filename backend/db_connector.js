// import mysql from 'mysql2';
//
// // 1. Create a connection pool or a single connection
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'pets'
// });
//
// // 2. Connect to the database and execute queries
// pool.getConnection((err, connection) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//
//     console.log('Connected to the database!');
//
//     // Example: Select data
//     connection.query('SELECT * FROM cats', (error, results) => {
//         if (error) {
//             console.error('Error executing query:', error);
//             connection.release(); // Release the connection back to the pool
//             return;
//         }
//         console.log('pets:', results);
//         connection.release(); // Release the connection
//     });
// });
let name = 'fufa';
let age = 10;
age = '10; DROP DATABASE'
let a = `SELECT * FROM 'users'  WHERE 'name' = ${name} AND 'age' > ${age}`;
console.log(a)