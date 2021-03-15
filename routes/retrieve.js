var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb+srv://Arjunreddy:Laxmanreddy123@cluster0.clhaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const client = new MongoClient(url);

client.connect(function (err) {
    assert.equal(null, err);
    console.log("Mongo db connection successful");
    // const db= client.db(dbName);
    app.listen(4000, function () {
        console.log("Server is running...");
    })
})

/* GET users listing. */
router.get('/', function (req, res) {
    const db = client.db('class');
    db.collection('student').find({}).toArray(function (err, data) {
        console.log(data)
        res.render('db', { covidData: data })
    })
});

module.exports = router;

//app.set('view engine','ejs');