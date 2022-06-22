const path = require('path');
const express = require('express');
var bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql2/promise');
const cors = require('cors');
const fs = require('fs')
const PORT = 8080;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const secret = "application-secret-key";

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
    password: '20002991',
    database: 'login_information'
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
  var id1 = ""
  var path2 = "";
  var files1 = "";
  var files2 = "";
  let imgStr2 = "";
  
  app.post('/request',urlencodedParser, async (req,res)=>{
    const connection2 = await initializeConnection(config);
    let [rows,fields] = await connection2.execute('SELECT organ.name, organ.id_organ, contour.folder_path FROM organ INNER JOIN contour ON organ.id_organ = contour.id_organ WHERE organ.name = ? order by rand()',[req.body.outline])
    console.log('The solution is: ', rows[0].folder_path);
    path1 = rows[0].folder_path;
    id1 = rows[0].id;
    path1 = path1 + "/CLASSIC"
    if(req.body.two){
        path2 = rows[1].folder_path + "/CLASSIC"
    }
    connection2.end();
    console.log("path 2 : " + path2)
    console.log("path 1 : " + path1)
    files1 = fs.readdirSync(path1)
    let imgStr1 =  fs.readFileSync(path.join(path1,files1[0]),"base64");

    if(req.body.two){
        files2 = fs.readdirSync(path2)  
        imgStr2 =  fs.readFileSync(path.join(path2,files2[0]),"base64");
    }  

    res.send(imgStr1 + "end1" + imgStr2)
  });
  
  app.post('/unknown_frame',urlencodedParser,(req,res)=>{
    var nb = req.body.number;
    let imgStr2 = ""
    var isTrueSet = (req.body.two === 'true');
    if(nb < Math.max(files1.length,files2.length)){
        if(isTrueSet){
            imgStr2 =  fs.readFileSync(path.join(path2,files2[nb]),"base64");
        }
        let imgStr =  fs.readFileSync(path.join(path1,files1[nb]),"base64");
        res.send(imgStr + "end1" + imgStr2)
    }else{res.send("Out of bounds")}
    });
    
  app.post('/graded',urlencodedParser,async (req,res)=>{
    let mark = req.body.value;
    mark = parseInt(mark)
    console.log("grade = " + mark);
    const connection3 = await initializeConnection(config);
    //await connection3.execute('')

  })

  
  app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", '*');
    response.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    response.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
    response.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    let user;
    let db="";
        let rows = "";
        try{
            db = await initializeConnection(config);
            [rows] = await db.execute("SELECT COUNT( * ) AS existingAccount FROM users WHERE username=?;", [username])
        }catch(e){console.log(e)}
        if (rows[0].existingAccount===0)
        {
            res.status(404).send({ message: "User not found, please sign up !" });
        }
        else {
            try{
                const [result] = (await db.execute("SELECT * FROM users WHERE username=?;", [username]));
                user = result[0];
                console.log(user.username);
                const encryptedPassword = { iv: user.iv, password: user.password };
                const decryptedPassword = decrypt(encryptedPassword);
                if (password!==decryptedPassword)
                {
                    res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password !"
                      });
                } 
                else 
                {
                         
              var token = jwt.sign({ id: user.id }, secret, {
                expiresIn: 86400 // 24 hours
              });
              debugger;
              console.log(user.role);
              try {
                console.log(user.role);
                res.status(200).send({
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  role: user.role,
                  accessToken: token, 
                  message: "Logged in !"
                });
              } catch(err) {
              res.status(500).send({ message: err.message });
            }
                }
            }catch(e){console.log(e)}
            }
    });

app.post('/signup', async (req, res) => {
    const { username, email, password, role } = req.body;
    const hashedPassword = encrypt(password);
    let rows = ""
    let db =""
    try{
        db = await initializeConnection(config);
        [rows] = await db.execute("SELECT COUNT( * ) AS existingAccount FROM users WHERE email=?", [email])
    }catch(e){console.log(e)}
    if (rows[0].existingAccount!==0)
    {
        res.send("This email adress already has an account");
    }
    else {
        try{
            let [rows2] = await db.execute("SELECT COUNT( * ) AS existingUsername FROM users WHERE username=?", [username])
            if (rows2[0].existingUsername!==0)
            {
                res.send("Username Taken");
            }
            else{
                let [result] = await db.execute("INSERT INTO users (username, password, iv, email, role) VALUES (?,?,?,?,?)", [username, hashedPassword.password, hashedPassword.iv, email, role])
                res.send("Success");
            }
        }catch(e){console.log(e)}
        }

    });


app.listen(PORT, () => console.log('API is running on http://localhost:8080'));