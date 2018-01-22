"use strict"
var express = require("express")
var app = express()
let models = require("../models")
let Page = models.Page
let User = models.User
let wikirouter = require("./wikirouter")


var router = express.Router()

router.get("/", function(req, res, next) {
  // res.redirect("/")
  res.render("index")
})

router.post("/", function(req, res, next){
	res.send("got to POST /wiki/")
})

router.get("/add", function(req, res, next){
	res.render("addpage")
})

router.post("/wiki", wikirouter)


router.use("/wiki", wikirouter)




module.exports = router
