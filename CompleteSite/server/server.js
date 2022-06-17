const path = require('path');
const http = require('http');
const {spawn} = require('child_process');
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const PORT = 8080;

const {encrypt, decrypt} = require('./encryptionHandler');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '20002991',
    database: 'login_information',
});

const config = {    //Parameters to connect to database. To change with the real parameters.
    host: 'localhost',
    user: 'root',
    password: '20002991',
    database: 'test2'
  };
  
  var connection = null;
  app.use(express.static(path.join(__dirname,'public')));

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
  
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  var path1 = "";
  var path2 = "";
  
  app.post('/request',urlencodedParser,(req,res)=>{
    connection = initializeConnection(config);
    console.log(req.body)
    connection.query('SELECT organ.name, contour.path FROM organ INNER JOIN contour ON organ.id_organ = contour.id_organ WHERE organ.name = ? order by rand()',[req.body.outline], (err, rows, fields) => {
    //  connection.query('SELECT * from countries', (err, rows, fields) => {
  
      if(err){throw err;}
      else{
      console.log('The solution is: ', rows[0].path);
       path1 = rows[0].path;
        if(req.body.two){
           path2 = rows[1].path
        }
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
    let jsonData = require('./outline.json'); 
    dataToSend = dataToSend + jsonData
    res.send(dataToSend)
    });
  });
  
  app.post('/unknown_frame',urlencodedParser,(req,res)=>{
    var nb = req.body.number;
    const python = spawn('python', ['test.py',"tablesturned.JPG"]);
    python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      dataToSend = data.toString();
     });
     // in close event we are sure that stream from child process is closed
     python.on('close', (code) => {
     console.log(`child process close all stdio with code ${code}`);
     // send data to browser
     delete require.cache[require.resolve('./outline.json')]
     let jsonData = require('./outline.json');
     console.log(dataToSend);
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

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = encrypt(password);

    db.query("SELECT COUNT( * ) AS existingAccount FROM users WHERE email=?", [email], function(err, rows) {
        if (err) throw err;
        if (rows[0].existingAccount!==0)
        {
            res.send("This email adress already has an account");
        }
        else {
            db.query("SELECT COUNT( * ) AS existingUsername FROM users WHERE username=?", [username], function(err, rows) {
                if (err) throw err;
                if (rows[0].existingUsername!==0)
                {
                    res.send("Username Taken");
                }
                else{
                    db.query("INSERT INTO users (username, password, iv, email) VALUES (?,?,?,?)", 
                    [username, hashedPassword.password, hashedPassword.iv, email],
                    (err, result) => {
                        if (err) { console.log(err); }
                        else { res.send("Success"); } 
                    });
                }
            });
        }
        });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query("SELECT COUNT( * ) AS existingAccount FROM users WHERE username=?;", [username], function(err, rows, fields) {
        if (err) throw err;
        if (rows[0].existingAccount===0)
        {
            res.send("There is no existing username, please sign up !");
        }

        else {
            db.query("SELECT * FROM users WHERE username=?;", 
            [username],
            (err, result) => {
                if (err) { console.log(err); }
                else {
                    const encryptedPassword = { iv: result[0].iv, password: result[0].password };
                    const decryptedPassword = decrypt(encryptedPassword);

                    if (password!==decryptedPassword)
                    {
                        res.send("This is not the right password, forgot password ?");
                    } 
                    else 
                    {
                        res.send("Logged in !");
                    }
                }
            });
        }
        });
});

app.listen(PORT, () => console.log('API is running on http://localhost:8080'));