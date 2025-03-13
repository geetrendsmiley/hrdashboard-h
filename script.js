// Initialize Charts
document.addEventListener("DOMContentLoaded", function () {
  // Attendance Chart
  const attendanceCtx = document
    .getElementById("attendanceChart")
    .getContext("2d");
  new Chart(attendanceCtx, {
    type: "line",
    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Present",
          data: [145, 148, 142, 150, 146, 143, 142],
          borderColor: "#3498db",
          tension: 0.4,
          fill: false,
        },
        {
          label: "Absent",
          data: [5, 2, 8, 0, 4, 7, 8],
          borderColor: "#e74c3c",
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 160,
        },
      },
    },
  });

  // Leave Distribution Chart
  const leaveCtx = document.getElementById("leaveChart").getContext("2d");
  new Chart(leaveCtx, {
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
      plugins: {
        legend: {
          position: "right",
        },
      },
    },
  });

  // Navigation Active State
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // Remove active class from all links
      navLinks.forEach((l) => l.parentElement.classList.remove("active"));
      // Add active class to clicked link
      this.parentElement.classList.add("active");
    });
  });

  // Search Functionality
  const searchInput = document.querySelector(".search-bar input");
  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    // Add your search logic here
    console.log("Searching for:", searchTerm);
  });

  // Update Stats
  function updateStats() {
    // Simulate real-time updates
    const stats = {
      totalEmployees: Math.floor(Math.random() * 20) + 140,
      presentToday: Math.floor(Math.random() * 10) + 135,
      onLeave: Math.floor(Math.random() * 5) + 5,
      departments: Math.floor(Math.random() * 3) + 10,
    };

    document.querySelector(".stat-card:nth-child(1) p").textContent =
      stats.totalEmployees;
    document.querySelector(".stat-card:nth-child(2) p").textContent =
      stats.presentToday;
    document.querySelector(".stat-card:nth-child(3) p").textContent =
      stats.onLeave;
    document.querySelector(".stat-card:nth-child(4) p").textContent =
      stats.departments;
  }

  // Update stats every 30 seconds
  setInterval(updateStats, 30000);

  // Add Activity
  function addActivity(activity, time) {
    const activityList = document.querySelector(".activity-list");
    const activityItem = document.createElement("div");
    activityItem.className = "activity-item";
    activityItem.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <div class="activity-info">
                <p>${activity}</p>
                <small>${time}</small>
            </div>
        `;
    activityList.insertBefore(activityItem, activityList.firstChild);

    // Remove oldest activity if there are more than 5
    if (activityList.children.length > 5) {
      activityList.removeChild(activityList.lastChild);
    }
  }

  // Simulate new activities
  const activities = [
    "New employee onboarding completed",
    "Leave request submitted",
    "Attendance report generated",
    "Department meeting scheduled",
    "Performance review completed",
  ];

  function simulateNewActivity() {
    const randomActivity =
      activities[Math.floor(Math.random() * activities.length)];
    const time = new Date().toLocaleTimeString();
    addActivity(randomActivity, time);
  }

  // Add new activity every 2 minutes
  setInterval(simulateNewActivity, 120000);
});
