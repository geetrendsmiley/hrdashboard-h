// Initialize charts when the page loads
document.addEventListener("DOMContentLoaded", function () {
  // Attendance History Chart
  const attendanceCtx = document
    .getElementById("attendanceChart")
    .getContext("2d");
  new Chart(attendanceCtx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Hours Worked",
          data: [8, 8.5, 7.5, 9, 8, 0, 0],
          borderColor: "#3498db",
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
          title: {
            display: true,
            text: "Hours",
          },
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });

  // Leave History Chart
  const leaveCtx = document.getElementById("leaveChart").getContext("2d");
  new Chart(leaveCtx, {
    type: "bar",
    data: {
      labels: ["Annual", "Sick", "Personal", "Other"],
      datasets: [
        {
          label: "Days Taken",
          data: [5, 2, 1, 0],
          backgroundColor: ["#3498db", "#e74c3c", "#2ecc71", "#9b59b6"],
        },
        {
          label: "Days Remaining",
          data: [10, 8, 2, 3],
          backgroundColor: ["#bdc3c7", "#bdc3c7", "#bdc3c7", "#bdc3c7"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          stacked: true,
          title: {
            display: true,
            text: "Days",
          },
        },
        x: {
          stacked: true,
        },
      },
      plugins: {
        legend: {
          position: "top",
        },
      },
    },
  });

  // Navigation functionality
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // Remove active class from all links
      navLinks.forEach((l) => l.parentElement.classList.remove("active"));
      // Add active class to clicked link
      this.parentElement.classList.add("active");

      // Handle page content changes here
      const targetSection = this.getAttribute("href").substring(1);
      console.log("Navigating to:", targetSection);
    });
  });

  // Search functionality
  const searchInput = document.querySelector(".search-bar input");
  searchInput.addEventListener("input", function (e) {
    // Implement search functionality here
    console.log("Searching for:", e.target.value);
  });

  // Clock In/Out functionality
  const clockStatus = document.querySelector(
    ".stat-card:first-child .stat-info p"
  );
  let isClockedIn = clockStatus.textContent === "Present";

  clockStatus.addEventListener("click", function () {
    isClockedIn = !isClockedIn;
    this.textContent = isClockedIn ? "Present" : "Absent";

    // Add to recent activities
    const activityList. = document.querySelector(".activity-list");
    const newActivity = document.createElement("div");
    newActivity.className = "activity-item";
    newActivity.innerHTML = `
            <i class="fas fa-clock"></i>
            <div class="activity-info">
                <p>Clock ${
                  isClockedIn ? "in" : "out"
                }: ${new Date().toLocaleTimeString()}</p>
                <small>Just now</small>
            </div>
        `;
    activityList.insertBefore(newActivity, activityList.firstChild);
  });

  // Update performance score animation
  const performanceScore = document.querySelector(
    ".stat-card:last-child .stat-info p"
  );
  let score = 0;
  const targetScore = parseFloat(performanceScore.textContent);
  const duration = 1500;
  const steps = 60;
  const increment = targetScore / steps;

  const animateScore = () => {
    score += increment;
    if (score <= targetScore) {
      performanceScore.textContent = score.toFixed(1) + "/5";
      requestAnimationFrame(animateScore);
    } else {
      performanceScore.textContent = targetScore.toFixed(1) + "/5";
    }
  };

  animateScore();
});
