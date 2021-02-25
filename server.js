const express = require("express");
const app = express();
const port = 8900;
const bodyParser = require("body-parser");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const cors = require("cors");
const AccountRoutes = require("./Account/accounts.routes");
const mongoUrl =
  process.env.MONGO_URL ||
  "mongodb+srv://sandip:sandip@delepment-cluster.6azuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let dbObj;
let coll_name = "auth";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use("/account", AccountRoutes);

// Create the Connection
MongoClient.connect(mongoUrl, (err, conn) => {
  if (err) throw err;
  console.log("Connection successfull");
  dbObj = conn.db("pos");
});
// Health Check
app.get("/", (req, res) => {
  res.send("Health OK");
});

// Get all Users
app.get("/getUser", (req, res) => {
  dbObj
    .collection(coll_name)
    .find()
    .toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
});

// Add Users
app.post("/addUser", (req, res) => {
  dbObj.collection(coll_name).insert(req.body, (err, result) => {
    if (err) throw err;
    res.status(200).send("User Added");
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
