document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember").checked;

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token
        if (remember) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userEmail", email);
        } else {
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("userEmail", email);
        }

        // Redirect to dashboard
        window.location.href = "dashboard.html";
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login");
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
