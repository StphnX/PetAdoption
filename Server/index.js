import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import fs from "fs";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import db from "./db/mongodb.js";
import errorHandler from "./middleware/errorHandling.js";
import petRouter from "./Routes/petRouter.js";
import authRoutes from "./Routes/authRoutes.js";
import { requireAuth, checkUser } from "./middleware/authMiddleware.js";
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import { createServer } from 'http';

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

// MongoDB connection details
const uri = `mongodb+srv://${username}:${password}@cluster0.wfbqjpb.mongodb.net/PetAdoption`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.join(__dirname, 'index.html');

dotenv.config();

const app = express(); // Initialize the Express app here

// Define the '/message' route after app initialization
app.get('/message', (req, res) => {
  res.sendFile(indexPath);
});

const server = createServer(app); // Create the HTTP server

const io = new Server(server); // Initialize Socket.io after creating the server

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

//middleware
app.use(express.json());
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/", petRouter);
app.use(authRoutes);
app.get('*', checkUser);

// error handling middleware
app.use(errorHandler);

const port = process.env.PORT || 3000;

db.once("open", () => {
  server.listen(port, () => {
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