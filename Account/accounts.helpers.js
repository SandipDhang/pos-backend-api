const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const mongoUrl =
  process.env.MONGO_URL ||
  "mongodb+srv://sandip:sandip@delepment-cluster.6azuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let dbObj;
let coll_name = "auth";

function authenticate({ email, password }) {
  console.log(email, "account service");
  MongoClient.connect(mongoUrl, (err, conn) => {
    if (err) throw err;
    console.log("Connection successfull");
    dbObj = conn.db("pos");
    const accont = dbObj.collection(coll_name).findOne({ email });

    if (!accont) {
      throw "no Account found";
    }
    return accont;
  });
}

module.exports = {
  authenticate,
};
