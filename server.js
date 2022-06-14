const path = require('path');
const http = require('http');
const {spawn} = require('child_process');
const express = require('express');

const app = express();
const server = http.createServer(app);
const mysql = require('mysql')

const config = {    //Parameters to connect to database. To change with the real parameters.
  host: 'localhost',
  user: 'root',
  password: '',
  port : 3306,
  database: 'test2'
};

var connection = null;

//Set static file

app.use(express.static(path.join(__dirname,'public')));

//Connection to the database, need to be called before each Database request. It handles timeout errors

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
  connection.query('SELECT organ.name, contour.path FROM organ INNER JOIN contour ON organ.id_organ = contour.id_organ WHERE organ.name = ?',[req.body.outline], (err, rows, fields) => {
    if(err){throw err;}
    else{
    console.log('The solution is: ', rows[0].contour.path);
    //res.send(rows[0].COUNTRY_NAME);}
    }
    connection.end();
  })
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['test.py',"moi.PNG"]);
  // collect data from script
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  const jsonData = require('./outline2.json'); 
  dataToSend = dataToSend + jsonData
  res.send(dataToSend)
  });
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
