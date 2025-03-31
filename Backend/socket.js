const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
  //Initialize Socket connections
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // event: join {to send msg on join, send msg that contain these 2(uId, uT)}
    socket.on('join', async (data) => {
      const {userId, userType } = data;  //both r in data

      // console.log(`User ${userId} joined as ${userType}`);

      if (userType === 'user') {
        await userModel.findByIdAndUpdate(userId, {  //update socketId
          socketId: socket.id
        });
      } else if (userType === 'captain') {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id
        });
      }
    });

    //event: ulc
    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;

      if (!location || !location.ltd || !location.lng) {
        return socket.emit('error', { message: 'Invalid location'})
      }
      await captainModel.findByIdAndUpdate(userId, { 
        location: {
          ltd: location.ltd,
          lng: location.lng
        } 
      });
    });

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;

      //validation for location
      if (!location || !location.ltd || !location.lng) {
        return socket.emit('error', { message: 'Invalid location data' });
      }
      
      await captainModel.findByIdAndUpdate(userId, { 
        location: {
          ltd: location.ltd,
          lng: location.lng
        }
      });
    });

    socket.on('disconnet', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

function sendMessageToSocketId(socketId, message) {
  //Send message to a specific socketId
  if (io) {
    io.to(socketId).emit('message', message)
  } else {
    console.log('Socket.io not initialized.');
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };