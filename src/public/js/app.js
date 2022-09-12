// socket : 서버로의 연결을 뜻합니다.
const socket = new WebSocket(`ws://${window.location.host}`);

// DOM
const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

function makeMessage(type, payload) {
  const message = { type, payload };

  return JSON.stringify(message);
}

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnectes from Server ❌");
});

function handNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  // console.log(input.value);
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

nickForm.addEventListener("submit", handNickSubmit);
messageForm.addEventListener("submit", handleMessageSubmit);
