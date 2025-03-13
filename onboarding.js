document.addEventListener("DOMContentLoaded", function () {
  const onboardingForm = document.getElementById("onboardingForm");
  const messageContainer = document.getElementById("message-container");

  function showMessage(message, type = "error") {
    messageContainer.className = `message-container ${type}`;
    messageContainer.innerHTML = `
      <i class="fas ${
        type === "error" ? "fa-exclamation-circle" : "fa-check-circle"
      }"></i>
      ${message}
    `;
  }

  function clearMessage() {
    messageContainer.className = "message-container";
    messageContainer.innerHTML = "";
  }

  onboardingForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    clearMessage();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const company = document.getElementById("company").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const terms = document.getElementById("terms").checked;

    // Basic validation
    if (!fullName || !email || !company || !password || !confirmPassword) {
      showMessage("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match");
      return;
    }

    if (!terms) {
      showMessage("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          company,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage(
          "Account created successfully! Redirecting to login...",
          "success"
        );
        setTimeout(() => {
          window.location.href = "login.html";
        }, 2000);
      } else {
        showMessage(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      showMessage("An error occurred during registration");
    }
  });

  // Check if user is already logged in
  if (
    localStorage.getItem("isLoggedIn") === "true" ||
    sessionStorage.getItem("isLoggedIn") === "true"
  ) {
    window.location.href = "dashboard.html";
  }
});
