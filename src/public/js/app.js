const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("서버에 연결 되었습니다. ✅");
});

socket.addEventListener("message", (message) => {
  console.log("서버에서 온 메세지: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("서버와 연결이 끊겼습니다. ❌");
});

setTimeout(() => {
  socket.send("브라우저에서 온 메세지: hello!!");
}, 10000);
