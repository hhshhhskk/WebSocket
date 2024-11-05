const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

// 자바스크립트 오브젝트를 서버로 보내지 않는 이유
// 서버가 자바나 GO 서버 일수도 있기 때문
function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("서버에 연결 되었습니다. ✅");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");

  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("서버와 연결이 끊겼습니다. ❌");
});

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

nickForm.addEventListener("submit", handleNickSubmit);
messageForm.addEventListener("submit", handleSubmit);
