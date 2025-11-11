const form = document.getElementById("signupForm");
const modal = document.getElementById("modal");
const modalMsg = document.getElementById("modalMessage");
const modalIcon = document.getElementById("modalIcon");
const progress = document.querySelector(".progress");
const phoneInput = document.getElementById("phone");

function showModal(message, type = "error", redirect = false) {
  modalMsg.textContent = message;
  modal.style.right = "0";

  if (type === "success") {
    modalIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    progress.style.background = "green";
  } else {
    modalIcon.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
    progress.style.background = "red";
  }

  let width = 100;
  progress.style.width = width + "%";
  const interval = setInterval(() => {
    width -= 2;
    progress.style.width = width + "%";

    if (width <= 0) {
      clearInterval(interval);
      modal.style.right = "-400px";
      if (redirect) {
        window.location.href = "login.php"; // change to dashboard.html if needed
      }
    }
  }, 100);
}

// Auto add +234 and format number
phoneInput.addEventListener("input", function (e) {
  let value = e.target.value.trim();

  // Remove all non-digit and + characters first
  value = value.replace(/[^\d+]/g, "");

  // If user starts with 0 (and not +), replace with +234
  if (value.startsWith("0")) {
    value = "+234" + value.substring(1);
  }

  // If it starts with + but not +234, don’t change anything
  if (!value.startsWith("+")) {
    value = "+234" + value;
  }

  // Format neatly: +234 812 345 6789
  value = value.replace(/(.{4})(.{3})(.{3})(.{0,4})/, "$1 $2 $3 $4");

  e.target.value = value.trim();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const phone = phoneInput.value.trim();

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
        showModal("Registration successful! Redirecting in 5s...", "success", true);
        form.reset();
      } else {
        showModal(res);
      }
    } else {
      showModal("Server error occurred");
    }
  };

  xhr.send(
    `first_name=${encodeURIComponent(firstName)}&last_name=${encodeURIComponent(lastName)}&phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
  );
});
