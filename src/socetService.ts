import { Server as httpServer } from 'http';
import { Server } from 'socket.io';

let io : Server;

export const initSocketIO = (server: httpServer): Server => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected', { socketId: socket.id });

    socket.on('disconnect', () => {
      console.log('A user disconnected', { socketId: socket.id });
    });
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};