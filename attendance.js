document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  const monthPicker = document.getElementById("attendanceMonth");
  const searchInput = document.querySelector(".search-bar input");
  const departmentFilter = document.querySelector(
    ".filter-options select:first-child"
  );
  const statusFilter = document.querySelector(
    ".filter-options select:last-child"
  );
  const editModal = document.getElementById("editAttendanceModal");
  const editForm = document.getElementById("editAttendanceForm");

  // Set current month in month picker
  const now = new Date();
  monthPicker.value = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  // Month change handler
  monthPicker?.addEventListener("change", (e) => {
    // Update attendance data based on selected month
    console.log("Selected month:", e.target.value);
    updateAttendanceData(e.target.value);
  });

  // Search functionality
  searchInput?.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll(".attendance-table tbody tr");

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
  });

  // Filter functionality
  function applyFilters() {
    const department = departmentFilter.value.toLowerCase();
    const status = statusFilter.value.toLowerCase();
    const rows = document.querySelectorAll(".attendance-table tbody tr");

    rows.forEach((row) => {
      const rowDepartment = row
        .querySelector("td:nth-child(2)")
        .textContent.toLowerCase();
      const rowStatus = row.querySelector(".status").textContent.toLowerCase();

      const departmentMatch = !department || rowDepartment === department;
      const statusMatch = !status || rowStatus === status;

      row.style.display = departmentMatch && statusMatch ? "" : "none";
    });
  }

  departmentFilter?.addEventListener("change", applyFilters);
  statusFilter?.addEventListener("change", applyFilters);

  // Edit attendance functionality
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest("tr");
      populateEditForm(row);
      editModal.style.display = "block";
    });
  });

  // Close modal when Cancel button is clicked
  document.querySelector(".cancel-btn")?.addEventListener("click", () => {
    editModal.style.display = "none";
  });

  // Handle edit form submission
  editForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add form data handling here
    console.log("Edit form submitted");
    editModal.style.display = "none";
    // Update row data
  });

  // Helper function to update attendance data
  function updateAttendanceData(month) {
    // Add API call or data update logic here
    console.log("Updating attendance data for:", month);
  }

  // Helper function to populate edit form
  function populateEditForm(row) {
    const date = row.querySelector("td:nth-child(3)").textContent;
    const clockIn = row.querySelector("td:nth-child(4)").textContent;
    const clockOut = row.querySelector("td:nth-child(5)").textContent;
    const status = row.querySelector(".status").textContent;

    // Set form values
    editForm.querySelector('input[type="date"]').value = date;
    editForm.querySelector('input[name="clockIn"]').value = clockIn;
    editForm.querySelector('input[name="clockOut"]').value = clockOut;
    editForm.querySelector("select").value = status.toLowerCase();
  }

  // Calculate total hours
  function calculateTotalHours(clockIn, clockOut) {
    const start = new Date(`2024-01-01 ${clockIn}`);
    const end = new Date(`2024-01-01 ${clockOut}`);
    const diff = (end - start) / (1000 * 60 * 60);
    return Math.round(diff * 10) / 10;
  }

  // Update summary cards
  function updateSummaryCards() {
    // Add logic to update summary cards based on filtered data
    const rows = document.querySelectorAll(
      '.attendance-table tbody tr:not([style*="none"])'
    );
    const total = rows.length;
    const present = rows.filter(
      (row) => row.querySelector(".status").textContent === "Present"
    ).length;
    const late = rows.filter(
      (row) => row.querySelector(".status").textContent === "Late"
    ).length;
    const absent = rows.filter(
      (row) => row.querySelector(".status").textContent === "Absent"
    ).length;

    document.querySelector(
      ".summary-card:nth-child(1) p"
    ).textContent = `${present}/${total}`;
    document.querySelector(".summary-card:nth-child(2) p").textContent = late;
    document.querySelector(".summary-card:nth-child(3) p").textContent = absent;
  }

  // Initial update
  updateSummaryCards();
});
