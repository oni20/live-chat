const BASE_URL = "http://localhost:3000";
const socket = io();

const addMessages = (message) => {
  var messageContainer = document.querySelector("#messagesContainer");
  messageContainer.innerHTML += `<h4> ${message.name} </h4><p> ${message.message} </p>`;
};

const getMessages = () => {
  fetch(`${BASE_URL}/messages`)
    .then((response) => response.json())
    .then((data) => {
      data.map((msgObj) => addMessages(msgObj));
    })
    .catch((err) => console.log("Error", err));
};

const postMessages = (data) => {
  fetch(`${BASE_URL}/messages`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
};

window.onload = (event) => {
  getMessages();

  const form = document.getElementsByTagName('form')[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    var message = {
        name: form.name.value,
        message: form.message.value,
      };
    postMessages(message);
  });
};

socket.on("chatmessages", addMessages);
