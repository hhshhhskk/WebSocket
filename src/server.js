import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
// http ws 같은 포트번호로 만들기 http위에 ws연결
const wss = new WebSocket.Server({ server });

// ws 연결
wss.on("connection", (socket) => {
  console.log("브라우저에 연결 되었습니다. ✅");
  socket.on("close", () => {
    console.log("브라우저와 연결이 끊겼습니다. ❌");
  });
  socket.on("message", (message) => {
    console.log(message.toString());
  });
  socket.send("hello!!");
});

server.listen(3000, handleListen);
