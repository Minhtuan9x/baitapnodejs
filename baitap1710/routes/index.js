var express = require('express');
var router = express.Router();
var model = require("../models/index.js");
router.get('/', model.findAll);
router.get("/viewadd",model.viewadd);
router.post("/",model.add);
router.delete("/",model.delete);
router.get("/viewsearch",model.viewSearch);
router.get("/search",model.search);
router.get("/viewdelete",model.viewdelete);
router.get("/:id/viewupdate",model.viewupdate);
router.put("/:id",model.update);
//
module.exports = router;