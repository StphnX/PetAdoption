import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import db from "./db/mongodb.js";
import errorHandler from "./middleware/errorHandling.js";
import petRouter from "./Routes/petRouter.js";
import { MongoClient } from "mongodb";
import fs from "fs";


const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

// MongoDB connection details
const uri = `mongodb+srv://${username}:${password}@cluster0.wfbqjpb.mongodb.net/PetAdoption`;


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", petRouter);

// error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;

db.once("open", () => {
  app.listen(port, () => {
    console.log(`Server running, listening to port ${port}`);
  });
});

db.once("error", (error) => {
  console.log(`Unable to establish database connection: ${error}\nExiting.`);
  process.exit(1);
});

// function to push JSON data into the specific mongo db collection


// const databaseName = "PetAdoption";
// const collectionName = "pets";

// // JSON file path
// const jsonFilePath = "PetList.json";

// // Read the JSON file
// const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));

// // Function to insert data into MongoDB
// async function insertData() {
//   const client = new MongoClient(uri, { useUnifiedTopology: true });

//   try {
//     await client.connect();
//     console.log("Connected to MongoDB successfully");

//     const database = client.db(databaseName);
//     const collection = database.collection(collectionName);

//     // Insert the data into the MongoDB collection
//     const result = await collection.insertMany(jsonData);
//     console.log(`Inserted ${result.insertedCount} documents into '${collectionName}'`);
//   } catch (err) {
//     console.error(`An error occurred: ${err}`);
//   } finally {
//     client.close();
//   }
// }

// insertData();