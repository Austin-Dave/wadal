// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.static("build")); // Serve static files from the build directory after running `npm run build`

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   console.log(`User connected with socket ID: ${socket.id}`);
//   // Add socket event handling code here, e.g., socket.on("join room", ...)

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//     console.log(`User disconnected with socket ID: ${socket.id}`);
//   });
// });

// const port = process.env.PORT || 8000;
// server.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

const express = require("express");
const http = require("http");
const socket = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socket(server);

const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "build")));

io.on("connection", (socket) => {
  console.log(`User connected with socket ID: ${socket.id}`);

  // Your existing socket event handlers go here

  socket.on("disconnect", () => {
    console.log(`User disconnected with socket ID: ${socket.id}`);
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
