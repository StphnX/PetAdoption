// import { Server } from 'socket.io';
// import { createServer } from 'http';
// import app from './index.js';
// import {server} from '../index.js';

// // const server = createServer(app); 

// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//     credentials: true
//   }
// }); 

// io.on('connection', (socket) => {
//   console.log(`Socket ${socket.id} connected`);

//   let username;

//   socket.on('setUsername', (user) => {
//     username = user;
//   });

//   socket.on('sendMessage', (message) => {
//     // io.emit('message', message);
//     socket.to(message.to).emit('message', message);
//   });

//   socket.on('disconnect', () => {
//     console.log(`Socket ${socket.id} disconnected`);
//   });
// });

// export default io;