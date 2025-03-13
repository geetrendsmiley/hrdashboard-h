document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  const addReviewBtn = document.querySelector(".add-btn");
  const reviewModal = document.getElementById("reviewModal");
  const reviewForm = document.getElementById("performanceReviewForm");
  const searchInput = document.querySelector(".search-bar input");
  const departmentFilter = document.querySelector(
    ".filter-options select:nth-child(1)"
  );
  const ratingFilter = document.querySelector(
    ".filter-options select:nth-child(2)"
  );
  const periodFilter = document.querySelector(
    ".filter-options select:nth-child(3)"
  );

  // Initialize charts
  initializeCharts();

  // Show modal when Add Review button is clicked
  addReviewBtn?.addEventListener("click", () => {
    reviewModal.style.display = "block";
  });

  // Close modal when Cancel button is clicked
  document.querySelector(".cancel-btn")?.addEventListener("click", () => {
    reviewModal.style.display = "none";
  });

  // Handle form submission
  reviewForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add form data handling here
    console.log("Review form submitted");
    reviewModal.style.display = "none";
  });

  // Search functionality
  searchInput?.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll(".performance-table tbody tr");

    rows.forEach((row) => {
      const name = row
        .querySelector(".employee-info span")
        .textContent.toLowerCase();
      const department = row
        .querySelector("td:nth-child(2)")
        .textContent.toLowerCase();

      if (name.includes(searchTerm) || department.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
    updateSummaryCards();
  });

  // Filter functionality
  function applyFilters() {
    const department = departmentFilter.value.toLowerCase();
    const rating = ratingFilter.value;
    const period = periodFilter.value.toLowerCase();
    const rows = document.querySelectorAll(".performance-table tbody tr");

    rows.forEach((row) => {
      const rowDepartment = row
        .querySelector("td:nth-child(2)")
        .textContent.toLowerCase();
      const rowRating = row.querySelector(".rating span").textContent;
      const rowPeriod = row
        .querySelector("td:nth-child(3)")
        .textContent.toLowerCase();

      const departmentMatch = !department || rowDepartment === department;
      const ratingMatch =
        !rating || parseFloat(rowRating) >= parseFloat(rating);
      const periodMatch = !period || rowPeriod === period;

      row.style.display =
        departmentMatch && ratingMatch && periodMatch ? "" : "none";
    });
    updateSummaryCards();
  }

  departmentFilter?.addEventListener("change", applyFilters);
  ratingFilter?.addEventListener("change", applyFilters);
  periodFilter?.addEventListener("change", applyFilters);

  // Star rating functionality
  document.querySelectorAll(".rating-input").forEach((container) => {
    const stars = container.querySelectorAll("i");
    stars.forEach((star, index) => {
      star.addEventListener("click", () => {
        stars.forEach((s, i) => {
          if (i <= index) {
            s.className = "fas fa-star";
          } else {
            s.className = "far fa-star";
          }
        });
      });
    });
  });

  // Add goal functionality
  const addGoalBtn = document.querySelector(".add-goal-btn");
  const goalsList = document.querySelector(".goals-list");

  addGoalBtn?.addEventListener("click", () => {
    const goalDiv = document.createElement("div");
    goalDiv.className = "goal-item";
    goalDiv.innerHTML = `
            <input type="text" placeholder="Enter goal">
            <select>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <button type="button" class="remove-goal-btn"><i class="fas fa-times"></i></button>
        `;
    goalsList.appendChild(goalDiv);

    // Add remove goal functionality
    goalDiv.querySelector(".remove-goal-btn").addEventListener("click", () => {
      goalDiv.remove();
    });
  });

  // Initialize charts
  function initializeCharts() {
    // Department Performance Chart
    const departmentCtx = document
      .getElementById("departmentChart")
      .getContext("2d");
    new Chart(departmentCtx, {
      type: "bar",
      data: {
        labels: ["IT", "HR", "Finance", "Marketing", "Sales"],
        datasets: [
          {
            label: "Average Rating",
            data: [4.5, 4.2, 4.0, 4.3, 4.1],
            backgroundColor: "#3498db",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
          },
        },
      },
    });

    // Rating Distribution Chart
    const ratingCtx = document.getElementById("ratingChart").getContext("2d");
    new Chart(ratingCtx, {
      type: "doughnut",
      data: {
        labels: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"],
        datasets: [
          {
            data: [30, 45, 15, 8, 2],
            backgroundColor: [
              "#2ecc71",
              "#3498db",
              "#f1c40f",
              "#e67e22",
              "#e74c3c",
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // Update summary cards
  function updateSummaryCards() {
    const rows = document.querySelectorAll(
      '.performance-table tbody tr:not([style*="none"])'
    );
    let totalRating = 0;
    let completedReviews = 0;
    let pendingReviews = 0;
    let topPerformers = 0;

    rows.forEach((row) => {
      const rating = parseFloat(row.querySelector(".rating span").textContent);
      const status = row.querySelector(".status").textContent;

      if (status === "Completed") {
        completedReviews++;
        totalRating += rating;
        if (rating >= 4.5) topPerformers++;
      } else {
        pendingReviews++;
      }
    });

    const averageRating =
      completedReviews > 0 ? (totalRating / completedReviews).toFixed(1) : 0;

    document.querySelector(".summary-card:nth-child(1) p").textContent =
      averageRating + "/5";
    document.querySelector(
      ".summary-card:nth-child(2) p"
    ).textContent = `${completedReviews}/${rows.length}`;
    document.querySelector(".summary-card:nth-child(3) p").textContent =
      pendingReviews;
    document.querySelector(".summary-card:nth-child(4) p").textContent =
      topPerformers;
  }

  // Initial update
  updateSummaryCards();
});
