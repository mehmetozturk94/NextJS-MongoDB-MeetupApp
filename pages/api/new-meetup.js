// /api/new-meetup
// POST /api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://mehmetoz9443:12345678M@cluster0.rlk5m.mongodb.net/meetups?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetsupCollection = db.collection("meetups");
    const result = meetsupCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup Inserted" });
  }
}

export default handler;
