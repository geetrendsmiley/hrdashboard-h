document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  const addEmployeeBtn = document.getElementById("addEmployeeBtn");
  const addEmployeeModal = document.getElementById("addEmployeeModal");
  const addEmployeeForm = document.getElementById("addEmployeeForm");
  const cancelBtn = addEmployeeModal.querySelector(".cancel-btn");
  const searchInput = document.querySelector(".search-bar input");
  const departmentFilter = document.querySelector(
    ".filter-options select:first-child"
  );
  const statusFilter = document.querySelector(
    ".filter-options select:last-child"
  );

  // Show modal when Add Employee button is clicked
  addEmployeeBtn.addEventListener("click", function () {
    addEmployeeModal.style.display = "block";
  });

  // Hide modal when Cancel button is clicked
  cancelBtn.addEventListener("click", function () {
    addEmployeeModal.style.display = "none";
    addEmployeeForm.reset();
  });

  // Hide modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === addEmployeeModal) {
      addEmployeeModal.style.display = "none";
      addEmployeeForm.reset();
    }
  });

  // Handle form submission
  addEmployeeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(addEmployeeForm);
    const employeeData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      department: formData.get("department"),
      position: formData.get("position"),
      joinDate: formData.get("joinDate"),
      status: formData.get("status"),
      profilePicture: formData.get("profilePicture"),
    };

    // Here you would typically send the data to your backend
    console.log("New Employee Data:", employeeData);

    // Show success notification
    showNotification("Employee added successfully!", "success");

    // Close modal and reset form
    addEmployeeModal.style.display = "none";
    addEmployeeForm.reset();

    // Refresh employee list (you would typically fetch updated data from backend)
    // refreshEmployeeList();
  });

  // Handle employee actions (view, edit, delete)
  const employeeActions = document.querySelectorAll(".actions button");
  employeeActions.forEach((button) => {
    button.addEventListener("click", function (e) {
      const action = e.currentTarget.classList[0]; // view-btn, edit-btn, or delete-btn
      const employeeRow = e.currentTarget.closest("tr");
      const employeeName = employeeRow.querySelector(
        ".employee-info span"
      ).textContent;

      switch (action) {
        case "view-btn":
          // Implement view functionality
          console.log("View employee:", employeeName);
          break;
        case "edit-btn":
          // Implement edit functionality
          console.log("Edit employee:", employeeName);
          break;
        case "delete-btn":
          // Implement delete functionality
          if (confirm(`Are you sure you want to delete ${employeeName}?`)) {
            console.log("Delete employee:", employeeName);
            showNotification("Employee deleted successfully!", "success");
          }
          break;
      }
    });
  });

  // Handle search functionality
  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll(".employee-list tbody tr");

    rows.forEach((row) => {
      const employeeName = row
        .querySelector(".employee-info span")
        .textContent.toLowerCase();
      const department = row
        .querySelector("td:nth-child(2)")
        .textContent.toLowerCase();
      const position = row
        .querySelector("td:nth-child(3)")
        .textContent.toLowerCase();

      if (
        employeeName.includes(searchTerm) ||
        department.includes(searchTerm) ||
        position.includes(searchTerm)
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  // Handle filter changes
  const filterSelects = document.querySelectorAll(".filter-options select");
  filterSelects.forEach((select) => {
    select.addEventListener("change", function () {
      // Implement filter functionality
      console.log("Filter changed:", select.value);
    });
  });
});
