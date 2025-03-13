// Initialize charts when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Store chart instances globally
  let attendanceChart = null;
  let leaveChart = null;

  // Function to initialize attendance chart
  function initAttendanceChart() {
    const attendanceCtx = document.getElementById("attendanceChart");
    if (!attendanceCtx) return;

    // Destroy existing chart if it exists
    if (attendanceChart) {
      attendanceChart.destroy();
    }

    attendanceChart = new Chart(attendanceCtx.getContext("2d"), {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Present",
            data: [145, 148, 142, 150, 146, 143, 142],
            borderColor: "#3498db",
            tension: 0.4,
          },
          {
            label: "Absent",
            data: [5, 2, 8, 0, 4, 7, 8],
            borderColor: "#e74c3c",
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
        animation: false, // Disable animations to prevent lag
      },
    });
  }

  // Function to initialize leave distribution chart
  function initLeaveChart() {
    const leaveCtx = document.getElementById("leaveChart");
    if (!leaveCtx) return;

    // Destroy existing chart if it exists
    if (leaveChart) {
      leaveChart.destroy();
    }

    leaveChart = new Chart(leaveCtx.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: ["Annual", "Sick", "Maternity", "Paternity", "Other"],
        datasets: [
          {
            data: [30, 20, 15, 10, 25],
            backgroundColor: [
              "#3498db",
              "#e74c3c",
              "#2ecc71",
              "#f1c40f",
              "#9b59b6",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "right",
          },
        },
        animation: false, // Disable animations to prevent lag
      },
    });
  }

  // Initialize charts only once
  initAttendanceChart();
  initLeaveChart();

  // Optimize resize event to prevent constant re-drawing
  let resizeTimeout;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      requestAnimationFrame(() => {
        initAttendanceChart();
        initLeaveChart();
      });
    }, 300); // Debounce resize events
  });

  // Navigation functionality
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach(function (link.) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      navLinks.forEach((l) => l.parentElement.classList.remove("active"));
      this.parentElement.classList.add("active");
    });
  });

  // Search functionality
  const searchInput = document.querySelector(".search-bar input");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      console.log("Searching for:", e.target.value);
    });
  }
});
