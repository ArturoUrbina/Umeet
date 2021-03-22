const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    port: 7777,
    database: 'MeetU'
  });
  
  mysqlConnection.connect((err)=>{
    if(!err){
      console.log("Conectó");
    }else{
      console.log("No Conectó");
    }
  });
  module.exports = mysqlConnection;