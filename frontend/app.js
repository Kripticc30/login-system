const API_URL = "https://login-system-r1ax.onrender.com";

// ===== Login =====
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const messageEl = document.getElementById("message");

  messageEl.textContent = "Logging in...";

  try {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      messageEl.textContent = data.message || "Login failed.";
      return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "dashboard.html";
  } catch (error) {
    messageEl.textContent = "Cannot connect to server.";
  }
});

// ===== Show Register Form =====
document.getElementById("showRegister").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("loginForm").classList.add("hidden");
  document.getElementById("registerForm").classList.remove("hidden");
});

// ===== Register =====
document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const messageEl = document.getElementById("registerMessage");

  messageEl.textContent = "Creating account...";

  try {
    const response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      messageEl.textContent = data.message || "Registration failed.";
      return;
    }

    messageEl.textContent = "Registration successful! You can now log in.";

    setTimeout(() => {
      document.getElementById("registerForm").classList.add("hidden");
      document.getElementById("loginForm").classList.remove("hidden");
    }, 1500);
  } catch (error) {
    messageEl.textContent = "Cannot connect to server.";
  }
});