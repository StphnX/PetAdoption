import { Server } from 'socket.io';

let io;

function initializeSocketServer(server){
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    socket.on('join_room', (data) => {
      const { room, username } = data;
      socket.join(room);
      socket.username = username;
    });

    socket.on('sendMessage', (data) => {
      const { to, message, from } = data;
      socket.to(to).emit('message', { from, message, to });
    });

    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
}

export { initializeSocketServer };
