const path = require('path');
const http = require('http');
const {spawn} = require('child_process');
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql2/promise');
const cors = require('cors');
const fs = require('fs')
const PORT = 8080;

const {encrypt, decrypt} = require('./encryptionHandler');
app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//     user: 'root',
//     host: 'localhost',
//     password: '20002991',
//     database: 'login_information',
// });

const config = {    //Parameters to connect to database. To change with the real parameters.
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test2'
  };
  
  var connection = null;
  app.use(express.static(path.join(__dirname,'public')));

  async function initializeConnection(config) {
    function addDisconnectHandler(connection) {
        connection.connect(function(error) {              // The server is either down
            if(error) {                                     // or restarting (takes a while sometimes).
                console.log('error when connecting to db:', error);
                setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
                if (error instanceof Error) {
                    if (error.code === "PROTOCOL_CONNECTION_LOST") {
                        console.error(error.stack);
                        console.log("Lost connection. Reconnecting...");
                        initializeConnection(connection.config);
                    } else if (error.fatal) {
                        throw error;
                    }
                }
            }                                     // to avoid a hot loop, and to allow our node script to
          });
    }
  
    connection = await mysql.createConnection(config);
  
    // Add handlers.
    addDisconnectHandler(connection);
  
    connection.connect();
    return connection;
  }
  
  var urlencodedParser = bodyParser.urlencoded({ extended: false })
  var path1 = "";
  var path2 = "";
  var files = "";
  
  app.post('/request',urlencodedParser, async (req,res)=>{
    const connection2 = await initializeConnection(config);

    console.log(req.body)
    let [rows,fields] = await connection2.execute('SELECT organ.name, contour.folder_path FROM organ INNER JOIN contour ON organ.id_organ = contour.id_organ WHERE organ.name = ? order by rand()',[req.body.outline])
    console.log('The solution is: ', rows[0].folder_path);
    path1 = rows[0].folder_path;
    path1 = path1 + "/CLASSIC"
    if(req.body.two){
        path2 = rows[1].folder_path + "/CLASSIC"
    }
    connection2.end();
    console.log("path 2 : " + path2)
    console.log("path 1 : " + path1)
    // var dataToSend;
    // // spawn new child process to call the python script
    // const python = spawn('python', ['test.py',"moi.PNG"]);
    // // collect data from script
    // python.stdout.on('data', function (data) {
    //  console.log('Pipe data from python script ...');
    //  dataToSend = data.toString();
    // });
    // // in close event we are sure that stream from child process is closed
    // python.on('close', (code) => {
    // console.log(`child process close all stdio with code ${code}`);
    // // send data to browser
    // let jsonData = require('./outline.json'); 
    // dataToSend = dataToSend + jsonData
    // //res.send(dataToSend)
    // files = fs.readdirSync(path1)
    // console.log(path.join(path1,files[0]));
    // let imgStr =  fs.readFileSync(path.join(path1,files[0]),"base64");
    // res.send(imgStr)
    // });
    files = fs.readdirSync(path1)
    let imgStr =  fs.readFileSync(path.join(path1,files[0]),"base64");
    res.send(imgStr)
  });
  
  app.post('/unknown_frame',urlencodedParser,(req,res)=>{
    var nb = req.body.number;
    // console.log("gneu")
    // const python = spawn('python', ['test.py',"tablesturned.JPG"]);
    // python.stdout.on('data', function (data) {
    //   console.log('Pipe data from python script ...');
    //   dataToSend = data.toString();
    //  });
    //  // in close event we are sure that stream from child process is closed
    //  python.on('close', (code) => {
    //  console.log(`child process close all stdio with code ${code}`);
    //  // send data to browser
    //  delete require.cache[require.resolve('./outline.json')]
    //  let jsonData = require('./outline.json');
    //  console.log(dataToSend);
    //  dataToSend = dataToSend + jsonData
     let imgStr =  fs.readFileSync(path.join(path1,files[nb]),"base64");
     res.send(imgStr)
     });
    //});
  
  app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", '*');
    response.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    response.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
    response.header("Access-Control-Allow-Credentials", "true");
    next();
  });

app.post('/register', (req, res) => {
    db = initializeConnection(config);
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
    db = initializeConnection(config);
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