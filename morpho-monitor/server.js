const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

function generateDroneData() {
  return {
    battery: Math.floor(Math.random() * 100),
    altitude: (Math.random() * 120).toFixed(2),
    temperature: (20 + Math.random() * 15).toFixed(1),
    mode: ["Idle", "Takeoff", "Cruise", "Landing"][Math.floor(Math.random() * 4)],
    speed: (Math.random() * 60).toFixed(2), // m/s
    latitude: (12.90 + Math.random() * 0.01).toFixed(6),
    longitude: (80.22 + Math.random() * 0.01).toFixed(6),
    heading: Math.floor(Math.random() * 360) // compass
  };
}

setInterval(() => {
  io.emit("telemetry", generateDroneData());
}, 1000);

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
