const express = require("express"); // Express.js
const path = require("path");
const { render } = require("express/lib/response"); // This Is a Render Function Whis Is Used To Two Or More People Communicate Virtually. 

const app = express(); 
const server = require("http").createServer(app); //Create a Server.

/*

SOCKET.IO is used for open connections to facilliate Real Time Communication, Still Relatively New Phenomenon at this time.

SOCKET.IO is library that enables real time bidirectional and event based communication between the browser and the server.

*/

const io = require("socket.io")(server);  

app.use(express.static(path.join(__dirname+"/public")));

io.on("connection",function(socket){  // Use SOCKET.IO

    socket.on("newuser",function(username){

        // If User Join The Chat It's Notifications you "UserName" Joined the conversation.
        // Example -: Basit has already login. Now, Daivik is a new user of ChatVibe Daivik recently join the app and login. so ChatVibe Notification me that daivik has joined the conversation.
        socket.broadcast.emit("update", username + " Joined the conversation"); 
    });



  

    socket.on("exituser",function(username){

        // This Method Run notified you that user has been left the chat. 
        // Ex - : Daivik Has Left The Chat || So, ChatVibe Notified Me that Daivik Has Left The Conversation.
        socket.broadcast.emit("update", username + " Left the conversation");
    });

    socket.on("chat",function(message){

        // This Method Is Used for virtually communicate each other.

        socket.broadcast.emit("chat",message);
    });
});
// This Is a Web App Server.
server.listen(5000); 