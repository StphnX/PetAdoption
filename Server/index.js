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
// import messagesRouter from './Routes/messagesRouter.js';


const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

// MongoDB connection details
const uri = `mongodb+srv://${username}:${password}@cluster0.wfbqjpb.mongodb.net/PetAdoption`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indexPath = path.join(__dirname, 'index.html');

dotenv.config();

const app = express(); // Initialize the Express app here

// // Define the '/message' route after app initialization
// app.get('/message', (req, res) => {
//   res.sendFile(indexPath);
// });


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
// app.use('/messages', messagesRouter)

const server = createServer(app); 

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true
  }
}); 

io.on('connection', (socket) => {
  // console.log(`Socket ${socket.id} connected`);

  socket.on('join_room', (data) => {
    const { room, username } = data;
    socket.join(room);
    socket.username = username;
  });

  socket.on('sendMessage', (data) => {
    const { to, message, from } = data;
    console.log(data);

    socket.to(to).emit('message', { from, message, to });
  });

  socket.on('disconnect', () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});



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
