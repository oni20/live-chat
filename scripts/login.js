const BASE_URL = "http://localhost:3000";
const errorBox = document.getElementById('errorBox');

const doAjax = async (data) => {
  const response = await fetch(`${BASE_URL}/login`, {
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
  })

  const jsonValue = await response.json();

  if (response.ok) {
    return Promise.resolve(jsonValue);
  } else {
    return Promise.reject(jsonValue);
  }
}

const postMessages = (data) => {
  doAjax(data).then(data => {
    console.log(data);
    window.location.href = "/";
  })
    .catch(err => {
      const { email, password } = err.errors
      showErrorMessage([email, password])
    });
};

const showErrorMessage = errorMsg => {
  let errorMessage = "<ul>";

  errorMsg.map(msg => {
    if (msg !== "") {
      errorMessage += `<li>${msg}</li>`;
    }
  });
  errorMessage += "</ul>";
  errorBox.innerHTML = errorMessage;
  errorBox.style.display = 'block';
};

const hideErrorMessage = () => {
  errorBox.style.display = 'none';
};

window.onload = (event) => {
  const form = document.getElementsByTagName('form')[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    var credentials = {
      email: form.email.value,
      password: form.password.value
    };
    postMessages(credentials);
  });
};
