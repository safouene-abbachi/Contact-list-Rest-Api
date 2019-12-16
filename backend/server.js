const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient, ObjectID } = require("mongodb");
const assert = require("assert");
const cors =require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())
const MongoUrl = "mongodb://localhost:27017";
const dataBase = "ContactList";

MongoClient.connect(
  MongoUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    assert.equal(err, null, "connection to database failed");
    const db = client.db(dataBase);

    app.post("/add_contact", (req, res) => {
      let newContact = req.body;
      db.collection("contacts").insertOne(newContact, (err, data) => {
        if (err) res.send("cant add contact");
        else res.send("contact added");
      });
    });

    app.get("/contacts", (req, res) => {
      db.collection("contacts")
        .find()
        .toArray((err, data) => {
          if (err) res.send("cant show contact");
          else res.send(data);
        });
    });

    app.put("/modify_contact/:id", (req, res) => {
      let modifiedContact = ObjectID(req.params.id);

      db.collection("contacts").findOneAndUpdate(
        { _id: modifiedContact },
        { $set: { ...req.body } },

        (err, data) => {
          if (err) res.send("can't modify contact");
          else res.send("contact modified");
        }
      );
    });

    app.delete("/delete_contact/:id", (req, res) => {
      let deletedContact = ObjectID(req.params.id);
      db.collection("contacts").findOneAndDelete(
        { _id: deletedContact },
        (err, data) => {
          if (err) res.send("can't delete contact");
          else res.send("contact deleted");
        }
      );
    });
  }
);

app.listen(5000, err => {
  if (err) console.log("server error");
  else console.log("server is running on port 5000");
});
