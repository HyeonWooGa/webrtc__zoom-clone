// socket : 서버로의 연결을 뜻합니다.
const socket = new WebSocket(`ws://${window.location.host}`);

// DOM
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

socket.addEventListener("message", (message) => {
  console.log("New message:", message.data);
});

socket.addEventListener("close", () => {
  console.log("Disconnectes from Server ❌");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  // console.log(input.value);
  socket.send(input.value);
  input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
