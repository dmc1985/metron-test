import socketIOClient from 'socket.io-client';

const SERVER_DOMAIN = process.env.SERVER_DOMAIN || 'http://localhost:'
const SERVER_PORT = process.env.SERVER_PORT || 8001

export default socketIOClient(`${SERVER_DOMAIN}${SERVER_PORT}`, {
  'reconnection': true,
  'reconnectionDelay': 1000,
  'reconnectionDelayMax' : 5000,
  'reconnectionAttempts': 5
});