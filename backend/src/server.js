require("dotenv").config();

const http = require("http");

const app = require("../src/app")

const connectDB =
 require("../src/config/db");

const {
 connectRedis
} = require(
 "../src/config/redis"
);

const { Server } =
 require("socket.io");

const PORT =
 process.env.PORT || 5000;

async function startServer() {

 try {

  await connectDB();

  await connectRedis();

  require(
 "../src/workers/emailWorker"
);

  const server =
   http.createServer(app);

  const io =
   new Server(server, {

    cors: {

     origin:
      process.env.CLIENT_URL,

     credentials:true,
    },
   });

  app.set("io", io);
const {

 addUser,

 removeUser,

} = require(
 "../src/socket/socketManager"
);

io.on(
 "connection",
 (socket) => {

  console.log(
   "Connected:",
   socket.id
  );

  socket.on(
   "register",
   (userId) => {

    addUser(
     userId,
     socket.id
    );

    console.log(
     `User ${userId} registered`
    );
   }
  );

  socket.on(
   "disconnect",
   () => {

    removeUser(
     socket.id
    );

    console.log(
     "Disconnected:",
     socket.id
    );
   }
  );
 }
);
  server.listen(
   PORT,
   () => {

    console.log(
     `Server running on ${PORT}`
    );

   }
  );

 } catch(error){

  console.error(error);

  process.exit(1);
 }
}

startServer();