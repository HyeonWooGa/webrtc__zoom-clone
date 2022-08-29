import express from "express";

const app = express();

// 뷰 엔진 설정
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// 유저에게 파일공유
app.use("/public", express.static(__dirname + "/public"));

// 라우터
app.get("/", (req, res) => res.render("home"));

// 앱.리슨
const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);
