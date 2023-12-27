const express = require("express");
const jwt = require("jsonwebtoken");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const mysql = require("mysql2");

const con = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database:"chat_app"

});
const isAuthenticated = (req, res, next) =>{
    const token = req.header("Authorization");

    jwt.verify(token, "d2c7eae4b025a186db0f1c8490c946a9f50e5a4a3c08e769a93d22f3785bbf3d", (err, user) => {
        if (err) {
          return res.status(403).json({ code_number: 403, message: "Forbidden: Invalid token" });
        }
    
        req.user = user;

        next();
      });
}

app.use(express.static("client"));

app.use(express.json());

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/client/login.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/client/register.html");
});

app.post("/register", (req, res) => {
        const {first_name,last_name,email,password} = req.body;
        console.log("Received POST request with data:", req.body);

        const query = "INSERT INTO register(first_name,last_name,email,password) VALUES (?,?,?,?)";
        con.query(query, [first_name,last_name,email,password], (err, result) => {
            console.log(result);
    
            if(err){
                console.error("Error executing database query:", err);
                return res.status(500).json({message: "Server errror."});
                
            }else{
                console.log("Database query result:", result);
                return res.status(201).json({message: "registerd successfully"});
                
            }
        });
    });


app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/client/login.html");
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const query = "SELECT user_id, first_name, last_name FROM register WHERE email = ? AND password = ?";

    con.query(query, [email, password], (err, result) => {
        if (!err) {
            if (result.length > 0) {
                return res.status(200).json({ message: result, codeNumber: 1 });
            }

            return res.status(200).json({ message: "Invalid username or password", codeNumber: 0 });
        }

        return res.status(500).json({ message: "Server Error" });
    });
});




app.get("/chat", (req, res) =>{
    res.sendFile(__dirname + "/client/chat/chat.html");
});


// app.get("/convo", (req, res) =>{
//     const sql = "SELECT user_id, message_text FROM message";

//     con.query(sql, (err, result) =>{
//         if(!err){
//             return res.status(200).json(result);
//         }

//         return res.status(500).json({message: "Server Error"});

//     });
// });

// io.on("connection", (socket) =>{
//     socket.on("chat", (messageObj) =>{
//         const { user_id, message_text } = messageObj;

//         // console.log(messageObj);

//         const sql = "INSERT INTO message(user_id, message_text) VALUES(?, ?)";

//         con.query(sql, [user_id, message_text], (err, result)=>{
            
//             if(!err){
//                 io.emit("chat", messageObj);
//                 // console.log(messageObj);
//             }
//             else{
//                 io.emit("chat", {user_id: 0, message_text: "Server Error"});
//                 console.error(err);
//             }
            
//         });

    
//     });

//     socket.on("disconnect", ()=>{
//         console.log("disconnected");


//     });


// });
app.get("/convo", isAuthenticated, (req, res)=> {

    const query = "SELECT user_id, message_text FROM message";

    con.query(query, (err, result) =>{
        if(!err){
            return res.status(200).json(result);
        }
        return res.status(500).json({message: "Server error."});
    });

});
// io.on("connection", (socket){
//     console.log("User Connected")
// });
server.listen(4000, () =>{
    console.log("Server listening on PORT 4000");
});
    
