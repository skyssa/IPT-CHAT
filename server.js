const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);

const mysql= require("mysql2");
 
const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"chat_app"
});

const io = socketio(server);
app.use(express.static("client"));

app.use(express.json());

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/client/register/index.html");
});

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/client/main/index.html");
});

app.post("/convo",(req, res)=>{
    
    const sql = "SELECT messageid,userid, message_text FROM message";
    con.query(sql, (err,result)=>{
        if(!err){
            return res.status(200).json(result);

        }
        return res.status(500).json({message:"server Error"});
    });
});


app.get("/login",(req, res)=>{
    res.sendFile(__dirname + "/client/login.html");
});
app.post("/login",(req, res)=>{
    const {username, userlast , useremail, userpassword}=req.body;
    const sql = "SELECT userid,username, userlast, useremail FROM register WHERE username=?, userlast=? , useremail=?, userpassword=?";
    con.query(sql, [username, userlast , useremail, userpassword], (err,result)=>{
        if(!err){
            if(result.affectedRows > 0){
                return res.status(200).json({message:"Successfully login,"});
                
            }else{
                return res.status(200).json({message: result, codenumber: 0});
            }
            

        }
        return res.status(500).json({message:"server Error"});
    });
});

app.get("/register", (req, res) => {
    res.status(404).json({ message: "Not Found" });
});

app.post("/register", (req, res) => {
    const { username, userlast, useremail, userpassword, usercpasss } = req.body;
    const sql = "INSERT INTO register(username, userlast, useremail, userpassword, usercpasss) VALUES (?,?,?,?,?)";
    con.query(sql, [username, userlast, useremail, userpassword, usercpasss], (err, result) => {
        if (!err) {
            return res.status(200).json({ message: "Successfully Created" });
        }
        return res.status(500).json({ message: "Server Error" });
    });
});
// app.get("/register",(req, res)=>{
//     res.sendFile(__dirname + "/client/index.js");
// })

// app.post("/register",(req, res)=>{
//     const {username, userlast , useremail, userpassword, usercpasss}=req.body;
//     const sql = "INSERT INTO register(username, userlast , useremail, userpassword, usercpasss) VALUES (?,?,?,?,?)";
//     con.query(sql, [username, userlast , useremail, userpassword, usercpasss], (err,result)=>{
//         if(!err){
//             return res.status(200).json({message:"Successfully Created,"});

//         }
//         return res.status(500).json({message:"server Error"});
//     })
// });



io.on("connection", (socket) =>{

    console.log("connected");

    socket.on("chat message", (messageObj) =>{

        const {userid, message} =messageObj;
        const sql ="INSERT INTO message(userid, ,message_text) VALUES (?,?)";

        con.query (sql, [userid, message], (err, result)=>{
            if(!err){
                return io.emit("chat", messageObj);

            }
            return io.emit("chat", err);
        })

        io.emit("chat message", messageObj);

    });

    socket.on("disconnect", ()=>{
        console.log("disconnected");


    });


});




server.listen(4000, () =>{
    console.log("Server listening on PORT 4000");
});




