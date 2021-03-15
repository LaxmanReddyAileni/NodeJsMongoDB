var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app=express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb+srv://Arjunreddy:Arjunreddy403@cluster0.clhaw.mongodb.net/ExreciseN1?retryWrites=true&w=majority';

const client = new MongoClient(url);
const movieSchema={
  id: String,
  name: String,
  rating: String
}
const Movie=mongoose.model('Movie',movieSchema);
client.connect(function(err){
  assert.equal(null,err);
  console.log("Mongo db connection successful");
  // const db= client.db(dbName);
  app.listen(4000,function(){
    console.log("Server is running...");
  })
})

/* GET users listing. */
router.get('/', function(req, res) {
  const db = client.db('ExreciseN1');
  db.collection('Routes').find({}).toArray(function (err,data){
    res.render('db',{moviesList:data})
  })
});

module.exports = router;

//app.set('view engine','ejs');