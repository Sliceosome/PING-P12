const path = require('path');
const http = require('http');
const express = require('express');
//const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
//const io = socketio(server);
const mysql = require('mysql')
const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  port : 3306,
  database: 'notes_bd'
};

var connection = null;
//app.use(express.static(path.join(__dirname,'public')));

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


//Routing of the website

app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/public/home.html',(err)=>{if(err)console.log(err);});
});

app.get('/scripts_front/home.js',(req,res)=>{
  res.sendFile(__dirname + '/public/scripts_front/home.js',(err)=>{if(err)console.log(err);});
});

app.get('/scripts_backs/users.js',(req,res)=>{
  res.sendFile(__dirname + '/public/scripts_backs/users.js',(err)=>{if(err)console.log(err);});
});

app.get('/scripts_backs/Individual.js',(req,res)=>{
  res.sendFile(__dirname + '/public/scripts_backs/Individual.js',(err)=>{if(err)console.log(err);});
});

app.get('/register.html',(req,res)=>{
  res.sendFile(__dirname + '/public/register.html',(err)=>{if(err)console.log(err);});
});
app.get('/scripts_front/register.js',(req,res)=>{
  res.sendFile(__dirname + '/public/scripts_front/register.js',(err)=>{if(err)console.log(err);});
});

app.get('/images/favicon_io/android-chrome-192x192.png',(req,res)=>{
  res.sendFile(__dirname + '/public/images/favicon_io/android-chrome-192x192.png',(err)=>{if(err)console.log(err);});
});

app.get('/images/favicon_io/android-chrome-512x512.png',(req,res)=>{
  res.sendFile(__dirname + '/public/images/favicon_io/android-chrome-512x512.png',(err)=>{if(err)console.log(err);});
});

app.get('/images/favicon_io/apple-touch-icon.png',(req,res)=>{
  res.sendFile(__dirname + '/public/images/favicon_io/apple-touch-icon.png',(err)=>{if(err)console.log(err);});
});

app.get('/images/favicon_io/favicon-16x16.png',(req,res)=>{
  res.sendFile(__dirname + '/public/images/favicon_io/favicon-16x16.png',(err)=>{if(err)console.log(err);});
});

app.get('/images/favicon_io/favicon-32x32.png',(req,res)=>{
  res.sendFile(__dirname + '/public/images/favicon_io/favicon-32x32.png',(err)=>{if(err)console.log(err);});
});

app.get('/images/favicon_io/favicon.ico',(req,res)=>{
  res.sendFile(__dirname + '/public/images/favicon_io/favicon.ico',(err)=>{if(err)console.log(err);});
});

app.get('/images/favicon_io/site.webmanifest',(req,res)=>{
  res.sendFile(__dirname + '/public/images/favicon_io/site.webmanifest',(err)=>{if(err)console.log(err);});
});

app.get('/scripts_front/register.js',(req,res)=>{
  res.sendFile(__dirname + '/public/scripts_front/register.js',(err)=>{if(err)console.log(err);});
});

app.get('/process.html',(req,res) => {
  res.sendFile(__dirname + '/public/process.html',(err)=>{if(err)console.log(err);});
});

app.get('/scripts_front/process.js',(req,res)=>{
  res.sendFile(__dirname + '/public/scripts_front/process.js',(err)=>{if(err)console.log(err);});
});

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



//Set connexion to bdd
//app.use(myconnection(mysql,optionBdd,'pool')); 


// Set static folder
// app.get('/process.html',(req,res) => {
//   req.getConnection((erreur,connection)=>{
//     if(erreur){
//       console.log(erreur);
//     }else{
//       connection.query('SELECT * FROM countries', (err, rows, fields) => {
//         if (err) throw err
      
//         console.log('The solution is: ', rows[0].COUNTRY_NAME)
//       })
//     }
//   }
// )});


app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", '*');
  response.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  response.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,OPTIONS");
  response.header("Access-Control-Allow-Credentials", "true");
  next();
});

// io.on('connection', socket => {
//   socket.on('joinRoom', ({ username, room }) => {
//     const user = userJoin(socket.id, username, room);

//     socket.join(user.room);

//     // Welcome current user
//     socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

//     // Broadcast when a user connects
//     socket.broadcast
//       .to(user.room)
//       .emit(
//         'message',
//         formatMessage(botName, `${user.username} has joined the chat`)
//       );

//     // Send users and room info
//     io.to(user.room).emit('roomUsers', {
//       room: user.room,
//       users: getRoomUsers(user.room)
//     });
//   });

//   // Listen for chatMessage
//   socket.on('chatMessage', msg => {
//     const user = getCurrentUser(socket.id);

//     io.to(user.room).emit('message', formatMessage(user.username, msg));
//   });

//   // Runs when client disconnects
//   socket.on('disconnect', () => {
//     const user = userLeave(socket.id);

//     if (user) {
//       io.to(user.room).emit(
//         'message',
//         formatMessage(botName, `${user.username} has left the chat`)
//       );

//       // Send users and room info
//       io.to(user.room).emit('roomUsers', {
//         room: user.room,
//         users: getRoomUsers(user.room)
//       });
//     }
//   });
// });


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
