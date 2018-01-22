let models = require("../models")
let Page = models.Page
let User = models.User
let express = require("express")


var router = express.Router()

router.post("/", function(req, res, next) {
  let page = Page.build({
    title: req.body.title,
    content: req.body.content,
  })
  page.save()
  .then(function() {
    res.redirect("/");
  })
});


module.exports = router;
