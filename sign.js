const form = document.getElementById("signupForm");
const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modalMessage");
const modalIcon = document.getElementById("modalIcon");
const progress = document.querySelector(".progress");

function showModal(message, type = "error") {
  modalMsg.textContent = message;
  modal.style.right = "0";

  if (type === "success") {
    modalIcon.textContent = "✔️";
    progress.style.background = "green";
  } else {
    modalIcon.textContent = "❌";
    progress.style.background = "red";
  }

  progress.style.width = "100%";
  let width = 100;
  const interval = setInterval(() => {
    width -= 2;
    progress.style.width = width + "%";
    if (width <= 0) {
      clearInterval(interval);
      modal.style.right = "-400px";
    }
  }, 50);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Validation
  if (firstName.length < 3) return showModal("First name must be at least 3 characters");
  if (lastName.length < 3) return showModal("Last name must be at least 3 characters");
  if (email.length < 8) return showModal("Email must be at least 8 characters");
  if (password.length < 8) return showModal("Password must be at least 8 characters");
  if (password !== confirmPassword) return showModal("Password mismatch!");

  // AJAX request
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "sign.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.status === 200) {
      const res = xhr.responseText.trim();
      if (res === "success") {
        showModal("Registration successful!", "success");
        form.reset();
      } else {
        showModal(res);
      }
    } else {
      showModal("Server error occurred");
    }
  };
  xhr.send(
    `first_name=${firstName}&last_name=${lastName}&phone=${phone}&email=${email}&password=${password}`
  );
});
