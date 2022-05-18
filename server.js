const path = require('path');
const http = require('http');
const express = require('express');
//const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
//const io = socketio(server);
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port : 3306,
  database: 'notes_bd'
})

//app.use(express.static(path.join(__dirname, 'public')));


connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

app.get('/process.html',(req,res) => {
  connection.query('SELECT * FROM countries', (err, rows, fields) => {
    connection.end();
    if(err){throw err;}
    else{
    console.log('The solution is: ', rows[0].COUNTRY_NAME);
    res.send(rows[0].COUNTRY_NAME);}
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
