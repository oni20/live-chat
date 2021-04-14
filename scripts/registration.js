const BASE_URL = "http://localhost:3000";

const doAjax = async (data) => {
  const response = await fetch(`${BASE_URL}/signup`, {
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
    window.location.href = "/login.html";
  })
    .catch(err => {
      console.log(err)
      showErrorMessage([err.error])
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

window.onload = (event) => {
  const form = document.getElementsByTagName('form')[0];

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      var message = {
        fullName: form.name.value,
        aliasName: form.aliasName.value,
        email: form.email.value,
        password: form.password.value,
        address: form.address.value
      };
      postMessages(message);
    }
    form.classList.add('was-validated');
  });
};