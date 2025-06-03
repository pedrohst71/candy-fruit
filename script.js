
const MASTER_CODE = "es293269";
const ACCESS_CODE = "290525";
const chat = document.getElementById("chat");
const error = document.getElementById("error");
const codeInput = document.getElementById("code");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

function checkCode() {
  const code = codeInput.value.trim();
  if (code === MASTER_CODE || code === ACCESS_CODE) {
    document.querySelector(".container").style.display = "none";
    chat.style.display = "block";
    loadMessages();
  } else {
    error.textContent = "Código incorreto!";
  }
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (text !== "") {
    const message = {
      text: text,
      time: Date.now()
    };
    let data = JSON.parse(localStorage.getItem("chatData") || "[]");
    data.push(message);
    localStorage.setItem("chatData", JSON.stringify(data));
    messageInput.value = "";
    loadMessages();
  }
}

function loadMessages() {
  let data = JSON.parse(localStorage.getItem("chatData") || "[]");
  const now = Date.now();
  data = data.filter(msg => now - msg.time < 24 * 60 * 60 * 1000); // 24h
  localStorage.setItem("chatData", JSON.stringify(data));

  messages.innerHTML = "";
  data.forEach(msg => {
    const div = document.createElement("div");
    div.className = "message";
    div.textContent = msg.text;
    messages.appendChild(div);
  });
}
