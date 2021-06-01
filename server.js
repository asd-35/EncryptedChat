const express = require("express");

app = express();

const url = require('url');    
const CryptoJS = require("crypto-js");
const mysql = require('mysql2');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const http = require('http').Server(app);
const io = require("socket.io")(http);

http.listen(3000, () => {
	console.log("alive")
})



app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'beesDB',
  password: "Passw0rd!"
}); 

const secret = "fb2eb10425b3816df517314443c0d98f487779ce02f4440baee81286484e0962dfb32541b76716360564ac4c92eccc6a7cbd7e7d25e87e5e5bb07d4802a04517"
//secret created by crypto.randomBytes(64).toString(hex)
const time = 3 * 24 * 60 * 60;

const createToken = (mail) => {
	return jwt.sign({ mail }, secret,
		{
			expiresIn: time
		})
	
}

const requireAuth = (req,res,next) => {
	const token = req.cookies["session-token"]

	if(token){
		jwt.verify(token,secret,(err,decoded) =>{
			if(err){
				res.redirect("/login");
			}else{
				next();
			}
		})
	}else{
		res.redirect("/login");
	}
}


app.set("view engine","ejs");





app.get("/",(req,res) => {
	const token = req.cookies["session-token"]
	if(token){
		res.redirect("/chatroom");
	}else{
		res.render("homepage")
	}
	});
app.post("/",(req,res) => {
	
	res.redirect("/login")
	});

app.get("/chatroom",requireAuth,(req,res) => {
	res.render("chatroom")
	
	
	});
app.post("/chatroom",requireAuth,(req,res) => {
	res.cookie("session-token","",{ maxAge: 1 })
	res.redirect("/")
	
	
	});

app.get("/chat",requireAuth,(req,res) => {
	res.render("chat")

	
	});

app.get("/login",(req,res) => {
	const token = req.cookies["session-token"]
	if(token){
		res.redirect("/chat")
	}else{
		res.render("login",{isLogged: [
		{
			value: 0
		}]})
	}
	
	});

app.post("/login",(req,res) => {
	

	var pass = CryptoJS.SHA256(req.body.pass).toString(CryptoJS.enc.Hex);
	var user = req.body.mail;
	connection.query(
  'SELECT * FROM Users WHERE username = "'+ user +'" AND user_password = "' + pass + '"',
  function(err, results, fields) {
    if(results != 0){
    	const token = createToken(user);
    	res.cookie("session-token",token,{ maxAge: time * 1000})
    	res.redirect("chatroom");
    	
    }else{
    	res.render("login",{isLogged: [
    		{
    			value: 1
    		}]});
    }
   
  }
);
	});

io.on("connection",(socket) =>{
	console.log(socket.id)

	socket.on("message", (data) => {
		io.emit("message",data)
	})		
})

app.use((req,res) => {
	res.status(404).render("404");
});