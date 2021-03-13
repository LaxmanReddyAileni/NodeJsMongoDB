const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const cool = require("cool-ascii-faces");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const MongoClient = require("mongodb").MongoClient;
const { title } = require("process");

const url =
  "mongodb+srv://Arjunreddy:Arjunreddy403@cluster0.clhaw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index",{title:'Express'}))
  .get("/cool", (req, res) => res.send(cool()))
  .get("/mongodb", (req, res) => {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      const db = client.db("ExreciseN1");
      const Routes = db.collection("Routes");
      Routes.find({}).toArray(function (err, docs) {
        if (err) throw err;
        res.render("pages/mongodb", { results: docs });
      });
      client.close(function (err) {
        if (err) throw err;
      });
    });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
