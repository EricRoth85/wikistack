var morgan = require("morgan")
var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var router = require("./routes/routes")
var nunjucks = require("nunjucks")
var path = require("path")
var models = require("./models")

var env = nunjucks.configure("views", {noCache: true})
// have res.render work with html files
app.set("view engine", "html")
// when res.render works with html files, have it use nunjucks to do so
app.engine("html", nunjucks.render)

app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, "/public")))
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use(router)

models.db.sync({force: true})


	.then(function () {
		var server = app.listen(1337, function(){
			console.log("listening on Port 1337")
		})
	})

	.catch(console.error);
