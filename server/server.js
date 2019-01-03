const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const bodyParser = require("body-parser");
var ObjectId = require("mongodb").ObjectId;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db = null;

MongoClient.connect(
  "mongodb://localhost:27017/",
  (err, client) => {
    if (err) {
      console.error(err);
    }
    db = client.db("PokerPlayer");
  }
);

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/pokerPlayer", (_req, res) => {
  db.collection("PokerPlayer")
    .find()
    .toArray((_err, docs) => res.status(200).send(docs));
});

app.post("/pokerPlayer", async (req, res) => {
  try {
    await db.collection("PokerPlayer").insertOne(req.body);
    db.collection("PokerPlayer")
      .find()
      .toArray((_err, docs) => res.status(200).send(docs));
  } catch (e) {
    res.status(400).send("Error adding player", e);
  }
});

app.put("/pokerPlayer", async (req, res) => {
  const id = req.body._id;
  const updated = req.body;
  delete updated._id;

  try {
    await db
      .collection("PokerPlayer")
      .updateOne({ _id: ObjectId(id) }, { $set: updated });
    db.collection("PokerPlayer")
      .find()
      .toArray((_err, docs) => res.status(200).send(docs));
  } catch (e) {
    res.status(400).send("Error updating player", e);
  }
});
