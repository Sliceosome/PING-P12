const path = require('path');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const mysql = require('mysql')
const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  port : 3306,
  database: 'notes_bd'
};

var connection = null;

//Set static file

app.use(express.static(path.join(__dirname,'public')));

//Connection to the database

function initializeConnection(config) {
  function addDisconnectHandler(connection) {
      connection.on("error", function (error) {
          if (error instanceof Error) {
              if (error.code === "PROTOCOL_CONNECTION_LOST") {
                  console.error(error.stack);
                  console.log("Lost connection. Reconnecting...");

                  initializeConnection(connection.config);
              } else if (error.fatal) {
                  throw error;
              }
          }
      });
  }

  connection = mysql.createConnection(config);

  // Add handlers.
  addDisconnectHandler(connection);

  connection.connect();
  return connection;
}

app.post('/request',(req,res)=>{
  connection = initializeConnection(config);
  connection.query('SELECT * FROM countries', (err, rows, fields) => {
    if(err){throw err;}
    else{
    console.log('The solution is: ', rows[0].COUNTRY_NAME);
    res.send(rows.COUNTRY_NAME);}
    connection.end();
  })
});

app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", '*');
  response.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  response.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
  response.header("Access-Control-Allow-Credentials", "true");
  next();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
