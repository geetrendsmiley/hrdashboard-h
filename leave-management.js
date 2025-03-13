document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  const searchInput = document.querySelector(".search-bar input");
  const statusFilter = document.querySelector(
    ".filter-options select:nth-child(1)"
  );
  const typeFilter = document.querySelector(
    ".filter-options select:nth-child(2)"
  );
  const fromDate = document.querySelector(
    '.filter-options input[type="date"]:nth-child(3)'
  );
  const toDate = document.querySelector(
    '.filter-options input[type="date"]:nth-child(4)'
  );
  const detailsModal = document.getElementById("leaveDetailsModal");

  // Search functionality
  searchInput?.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll(".leave-requests tbody tr");

    rows.forEach((row) => {
      const name = row
        .querySelector(".employee-info span")
        .textContent.toLowerCase();
      const leaveType = row
        .querySelector("td:nth-child(2)")
        .textContent.toLowerCase();

      if (name.includes(searchTerm) || leaveType.includes(searchTerm)) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
    updateSummaryCards();
  });

  // Filter functionality
  function applyFilters() {
    const status = statusFilter.value.toLowerCase();
    const type = typeFilter.value.toLowerCase();
    const from = fromDate.value;
    const to = toDate.value;

    const rows = document.querySelectorAll(".leave-requests tbody tr");

    rows.forEach((row) => {
      const rowStatus = row.querySelector(".status").textContent.toLowerCase();
      const rowType = row
        .querySelector("td:nth-child(2)")
        .textContent.toLowerCase();
      const rowFrom = row.querySelector("td:nth-child(3)").textContent;
      const rowTo = row.querySelector("td:nth-child(4)").textContent;

      const statusMatch = !status || rowStatus === status;
      const typeMatch = !type || rowType === type;
      const dateMatch = checkDateRange(rowFrom, rowTo, from, to);

      row.style.display = statusMatch && typeMatch && dateMatch ? "" : "none";
    });
    updateSummaryCards();
  }

  // Helper function to check if dates overlap
  function checkDateRange(rowFrom, rowTo, filterFrom, filterTo) {
    if (!filterFrom && !filterTo) return true;

    const start = filterFrom ? new Date(filterFrom) : new Date(0);
    const end = filterTo ? new Date(filterTo) : new Date(9999, 11, 31);
    const leaveStart = new Date(rowFrom);
    const leaveEnd = new Date(rowTo);

    return leaveStart <= end && leaveEnd >= start;
  }

  // Add event listeners for filters
  statusFilter?.addEventListener("change", applyFilters);
  typeFilter?.addEventListener("change", applyFilters);
  fromDate?.addEventListener("change", applyFilters);
  toDate?.addEventListener("change", applyFilters);

  // Show leave details modal
  document.querySelectorAll(".leave-requests tbody tr").forEach((row) => {
    row.addEventListener("click", () => {
      populateDetailsModal(row);
      detailsModal.style.display = "block";
    });
  });

  // Close modal when Cancel button is clicked
  document
    .querySelector(".modal .cancel-btn")
    ?.addEventListener("click", () => {
      detailsModal.style.display = "none";
    });

  // Approve leave request
  document.querySelectorAll(".approve-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const row = e.target.closest("tr");
      const status = row.querySelector(".status");
      status.textContent = "Approved";
      status.className = "status approved";
      updateSummaryCards();
    });
  });

  // Reject leave request
  document.querySelectorAll(".reject-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const row = e.target.closest("tr");
      const status = row.querySelector(".status");
      status.textContent = "Rejected";
      status.className = "status rejected";
      updateSummaryCards();
    });
  });

  // Helper function to populate details modal
  function populateDetailsModal(row) {
    const name = row.querySelector(".employee-info span").textContent;
    const type = row.querySelector("td:nth-child(2)").textContent;
    const from = row.querySelector("td:nth-child(3)").textContent;
    const to = row.querySelector("td:nth-child(4)").textContent;
    const days = row.querySelector("td:nth-child(5)").textContent;
    const reason = row.querySelector("td:nth-child(6)").textContent;
    const status = row.querySelector(".status").textContent;

    const modal = document.getElementById("leaveDetailsModal");
    modal.querySelector(".detail-group:nth-child(1) p").textContent = name;
    modal.querySelector(".detail-group:nth-child(2) p").textContent = type;
    modal.querySelector(
      ".detail-group:nth-child(3) p"
    ).textContent = `${days} days (${from} - ${to})`;
    modal.querySelector(".detail-group:nth-child(4) p").textContent = reason;
    modal.querySelector(".detail-group:nth-child(5) p").textContent = status;
    modal.querySelector(
      ".detail-group:nth-child(5) p"
    ).className = `status ${status.toLowerCase()}`;
  }

  // Update summary cards
  function updateSummaryCards() {
    const rows = document.querySelectorAll(
      '.leave-requests tbody tr:not([style*="none"])'
    );
    const pending = rows.filter(
      (row) => row.querySelector(".status").textContent === "Pending"
    ).length;
    const approved = rows.filter(
      (row) => row.querySelector(".status").textContent === "Approved"
    ).length;
    const rejected = rows.filter(
      (row) => row.querySelector(".status").textContent === "Rejected"
    ).length;
    const today = rows.filter((row) => {
      const from = new Date(row.querySelector("td:nth-child(3)").textContent);
      const to = new Date(row.querySelector("td:nth-child(4)").textContent);
      const now = new Date();
      return (
        from <= now &&
        to >= now &&
        row.querySelector(".status").textContent === "Approved"
      );
    }).length;

    document.querySelector(".summary-card:nth-child(1) p").textContent =
      pending;
    document.querySelector(".summary-card:nth-child(2) p").textContent =
      approved;
    document.querySelector(".summary-card:nth-child(3) p").textContent =
      rejected;
    document.querySelector(".summary-card:nth-child(4) p").textContent = today;
  }

  // Initial update
  updateSummaryCards();
});
