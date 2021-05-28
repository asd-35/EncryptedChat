const express = require("express");
const CryptoJS = require("crypto-js");
const mysql = require('mysql2');

app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'beesDB',
  password: "Passw0rd!"
}); 


app.set("view engine","ejs");

app.listen(3000);

console.log("live on 3000")

app.get("/", (req,res) => {
	
	res.render("homepage")
	});

app.post("/", (req,res) => {
	
	res.redirect("/login");
});

app.get("/chat", (req,res) => {
	res.render("chat")
	
	
	});

app.get("/login", (req,res) => {
	res.render("login",{isLogged: [
		{
			value: 0
		}]})
	
	});

app.post("/login", (req,res) => {
	

	var pass = CryptoJS.SHA256(req.body.pass).toString(CryptoJS.enc.Hex);
	var user = req.body.mail;
	connection.query(
  'SELECT * FROM Users WHERE username = "'+ user +'" AND user_password = "' + pass + '"',
  function(err, results, fields) {
    if(results != 0){
    	res.redirect("chat");
    	
    }else{
    	res.render("login",{isLogged: [
    		{
    			value: 1
    		}]});
    }
   
  }
);
	});

app.use((req,res) => {
	res.status(404).render("404");
});