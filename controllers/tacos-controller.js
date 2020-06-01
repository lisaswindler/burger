var express = require("express");

var path = require("path");

var router = express.Router();

// Import the model to use its database functions.
var taco = require("../models/taco.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    taco.selectAll(function (data) {
        var hbsObject = {
            tacos: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.get("/", function(req, res) {
    
  });

router.get("/api/tacos", function (req, res) {
    taco.selectAll(function (data) {
        res.json(data);
    });
});

router.post("/api/tacos", function (req, res) {
    taco.insertOne([
        "taco_name", "devoured"
    ], [
        req.body.taco_name, req.body.devoured
    ], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

router.put("/api/tacos/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    taco.updateOne({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;
