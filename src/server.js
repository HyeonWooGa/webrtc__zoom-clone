import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

// 뷰 엔진 설정
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// 퍼블릭 폴더에 유저가 접근하지 못하게 설정
app.use("/public", express.static(__dirname + "/public"));

// 라우터
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

// 리슨 핸들러
const handleListen = () => console.log(`Listening on http://localhost:3000`);

// 같은 서버에서 http, webSocekt 서버 작동 (Optional)
//// http 와 ws 의 포트를 나눠도 되고 ws 만 사용해도 됩니다.

// http 서버 생성
const server = http.createServer(app);

// WebSocket 서버 생성
const wss = new WebSocket.Server({ server });

// fake database, 연결 목록
const sockets = [];

// on 이 "connection" 이벤트를 기다립니다.
// socket : 연결된 브라우저를 뜻합니다.
wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Browser ✅");
  socket.on("close", () => console.log("Disconnected from the Browser ❌"));
  socket.on("message", (message) =>
    sockets.forEach((aSocket) => aSocket.send(message.toString()))
  );
});

server.listen(3000, handleListen);
