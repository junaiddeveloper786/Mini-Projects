const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
  hideMessage();
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
  hideMessage();
});

// Show message
function showMessage(msg) {
  const box = document.getElementById("messageBox");
  box.innerHTML = msg;
  box.style.display = "block";
}

function hideMessage() {
  const box = document.getElementById("messageBox");
  box.style.display = "none";
}

// Signup handler
document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  if (!name || !email || !password) {
    showMessage("Please fill all fields.");
    return;
  }

  const namePattern = /^[A-Za-z\s]+$/;
  if (!namePattern.test(name)) {
    showMessage("Name must contain only letters.");
    return;
  }

  const emailPattern = /^[A-Za-z]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
  if (!emailPattern.test(email)) {
    showMessage("Please enter a valid email address (letters only before @).");
    return;
  }

  if (password.length < 6) {
    showMessage("Password must be at least 6 characters long.");
    return;
  }

  const existingUser = JSON.parse(localStorage.getItem("user"));
  if (existingUser && existingUser.email === email) {
    showMessage("Email is already registered.");
    return;
  }

  const userData = { name, email, password };
  localStorage.setItem("user", JSON.stringify(userData));
  showMessage("Account created successfully!");
  this.reset();
});

// Login handler
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    showMessage("Please fill all fields.");
    return;
  }

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (
    storedUser &&
    storedUser.email === email &&
    storedUser.password === password
  ) {
    showMessage(`Welcome back, ${storedUser.name}!`);
  } else {
    showMessage("Invalid email or password.");
  }

  this.reset();
});
