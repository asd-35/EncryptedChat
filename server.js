const express = require("express");

app = express();
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.set("view engine","ejs");

app.listen(3000);

console.log("live on 3000")

app.get("/", (req,res) => {
	res.render("homepage")
	});