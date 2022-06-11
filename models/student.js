const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '5271',
  database: 'student',
  socketPath: '/opt/lampp/var/mysql/mysql.sock'
});

connection.connect( (err) => {
    if(err){
        console.log(err);
    }else{
        console.log("connected");
    }
});

module.exports = connection;
