var express = require('express');
var router = express.Router();
var student = require("../routes/student.js")

router.get('/',student.findAll);
router.get("/viewadd", student.viewAdd);
router.post("/", student.add);
router.delete("/", student.delete);
router.get("/viewsearch",student.viewSearch);
router.get("/search",student.search);
router.get("/viewdelete", student.viewDelete);
router.get("/:id/viewupdate",student.viewUpdate);
router.put("/:id", student.update);

module.exports = router;