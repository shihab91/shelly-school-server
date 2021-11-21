const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const port = 5000;

const app = express();
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://emaDbUser:9UY1UuYmSqb2lWa9@cluster0.bvkvy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db("shelly_school");
    const courseCollection = database.collection("courses");
    const teacherCollection = database.collection("teachers");
    const welcomeCollection = database.collection("welcome");

    app.get("/courses", async (req, res) => {
      const cursor = courseCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    })
    app.get("/teachers", async (req, res) => {
      const cursor = teacherCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    })
    app.get("/welcome", async (req, res) => {
      const cursor = welcomeCollection.find({});
      const result = await cursor.toArray();
      res.json(result);
    })
  }
  finally {

  }
}

run().catch(console.dir);

app.get("/", async (req, res) => {
  res.send("welcome user")
})
app.listen(port, () => {
  console.log("listening on port : ", port);
})