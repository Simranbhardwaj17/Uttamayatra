const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000  //use port according to env 

const server = http.createServer(app);  //pass the app var

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});