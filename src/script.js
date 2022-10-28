const form = document.querySelector("#form");
const errorsContainer = document.querySelector(".errors");
const errorsList = document.querySelector(".errors-list");
const numRegex = /^[6-9]\d{9}$/gi
form.addEventListener("submit", checkErrors);

function checkErrors(e) {
  const errorMessages = [];
  clearErrors();

  const username = document.querySelector("#username").value;
  const number = document.querySelector("#phone").value
  const password = document.querySelector("#password").value;
  const passwordConfirmation = document.querySelector("#password-confirmation")
    .value;
  const terms = document.querySelector("#terms");

  if (username.length < 6)
    errorMessages.push("The username must be atleast 6 characters long!");
  if (!numRegex.test(number)) errorMessages.push("Please provide a valid Indian phone number")
  if (password.length < 10)
    errorMessages.push("The password must be atleast 10 characters long!");
  if (password != passwordConfirmation)
    errorMessages.push("Password does not match!");
  if (!terms.checked) errorMessages.push("Please agree the terms!");

  if (errorMessages.length > 0) {
    e.preventDefault();
    showErrors(errorMessages);
  }
}

// clears error messages from UI
function clearErrors() {
  // errorsList.innerHTML = ""
  // while the first child of list is not a null it evaluates to true as long as it has a first child
  while (errorsList.children[0] != null) {
    errorsList.removeChild(errorsList.children[0]);
  }
  errorsContainer.classList.remove("show");
  // IMPORTANT: This cannot be done with a forEach loop or a normal for loop since as you remove children it will modify the list you are looping over which will not work
}

// shows error messages to UI
function showErrors(errorMessages) {
  errorMessages.forEach((msg) => {
    const li = document.createElement("li");
    li.innerText = msg;
    errorsList.appendChild(li);
  });
  errorsContainer.classList.add("show");
}
