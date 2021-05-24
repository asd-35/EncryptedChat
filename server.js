const express = require("express");
var CryptoJS = require("crypto-js");


app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));



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
	
	// SHA-256 will use later
	});

app.get("/login", (req,res) => {
	res.render("login")
	
	});

app.post("/login", (req,res) => {
	res.redirect("chat")
	console.log(CryptoJS.SHA256(req.body.pass).toString(CryptoJS.enc.Hex))
	});

app.use((req,res) => {
	res.status(404).render("404");
});