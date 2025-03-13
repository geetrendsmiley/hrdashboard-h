document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  const generatePayrollBtn = document.getElementById("generatePayrollBtn");
  const processPaymentBtn = document.getElementById("processPaymentBtn");
  const payrollTable = document.querySelector(".payroll-table tbody");
  const searchInput = document.querySelector(".search-bar input");
  const departmentFilter = document.querySelector(
    ".filter-options select:first-child"
  );
  const statusFilter = document.querySelector(
    ".filter-options select:last-child"
  );

  // Sample payroll data (replace with actual data from backend)
  let payrollData = [
    {
      id: 1,
      employee: "John Doe",
      department: "IT",
      basicSalary: 5000,
      allowances: 1000,
      deductions: 500,
      bonus: 200,
      netSalary: 5700,
      status: "Pending",
      paymentDate: "2024-02-28",
    },
    {
      id: 2,
      employee: "Sarah Johnson",
      department: "HR",
      basicSalary: 4500,
      allowances: 800,
      deductions: 400,
      bonus: 150,
      netSalary: 5050,
      status: "Processed",
      paymentDate: "2024-02-28",
    },
  ];

  // Function to format currency
  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  }

  // Function to render payroll table
  function renderPayrollTable(data = payrollData) {
    payrollTable.innerHTML = "";
    data.forEach((employee) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          <div class="employee-info">
            <img src="https://via.placeholder.com/40" alt="${
              employee.employee
            }" />
            <span>${employee.employee}</span>
          </div>
        </td>
        <td>${employee.department}</td>
        <td>${formatCurrency(employee.basicSalary)}</td>
        <td>${formatCurrency(employee.allowances)}</td>
        <td>${formatCurrency(employee.deductions)}</td>
        <td>${formatCurrency(employee.bonus)}</td>
        <td>${formatCurrency(employee.netSalary)}</td>
        <td><span class="status ${employee.status.toLowerCase()}">${
        employee.status
      }</span></td>
        <td>${employee.paymentDate}</td>
        <td>
          <div class="actions">
            <button class="view-btn" data-id="${
              employee.id
            }"><i class="fas fa-eye"></i></button>
            <button class="edit-btn" data-id="${
              employee.id
            }"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" data-id="${
              employee.id
            }"><i class="fas fa-trash"></i></button>
          </div>
        </td>
      `;
      payrollTable.appendChild(row);
    });
  }

  // Generate Payroll
  generatePayrollBtn.addEventListener("click", function () {
    // Here you would typically fetch employee data and calculate payroll
    showNotification("Generating payroll...", "info");

    // Simulate API call
    setTimeout(() => {
      showNotification("Payroll generated successfully!", "success");
      renderPayrollTable();
    }, 1500);
  });

  // Process Payment
  processPaymentBtn.addEventListener("click", function () {
    const pendingPayments = payrollData.filter(
      (emp) => emp.status === "Pending"
    );

    if (pendingPayments.length === 0) {
      showNotification("No pending payments to process", "warning");
      return;
    }

    showNotification("Processing payments...", "info");

    // Simulate API call
    setTimeout(() => {
      payrollData = payrollData.map((emp) => {
        if (emp.status === "Pending") {
          return { ...emp, status: "Processed" };
        }
        return emp;
      });

      showNotification("Payments processed successfully!", "success");
      renderPayrollTable();
    }, 1500);
  });

  // Handle payroll actions (view, edit, delete)
  payrollTable.addEventListener("click", function (e) {
    const button = e.target.closest("button");
    if (!button) return;

    const employeeId = parseInt(button.dataset.id);
    const employee = payrollData.find((emp) => emp.id === employeeId);

    if (!employee) return;

    const action = button.classList[0]; // view-btn, edit-btn, or delete-btn

    switch (action) {
      case "view-btn":
        showPayrollDetails(employee);
        break;
      case "edit-btn":
        editPayrollDetails(employee);
        break;
      case "delete-btn":
        if (
          confirm(
            `Are you sure you want to delete payroll record for ${employee.employee}?`
          )
        ) {
          deletePayrollRecord(employeeId);
        }
        break;
    }
  });

  // Function to show payroll details
  function showPayrollDetails(employee) {
    const details = `
      Employee: ${employee.employee}
      Department: ${employee.department}
      Basic Salary: ${formatCurrency(employee.basicSalary)}
      Allowances: ${formatCurrency(employee.allowances)}
      Deductions: ${formatCurrency(employee.deductions)}
      Bonus: ${formatCurrency(employee.bonus)}
      Net Salary: ${formatCurrency(employee.netSalary)}
      Status: ${employee.status}
      Payment Date: ${employee.paymentDate}
    `;

    showNotification(details, "info", 5000);
  }

  // Function to edit payroll details
  function editPayrollDetails(employee) {
    // Here you would typically open a modal with a form to edit payroll details
    showNotification("Edit functionality to be implemented", "info");
  }

  // Function to delete payroll record
  function deletePayrollRecord(employeeId) {
    payrollData = payrollData.filter((emp) => emp.id !== employeeId);
    renderPayrollTable();
    showNotification("Payroll record deleted successfully!", "success");
  }

  // Handle search functionality
  searchInput.addEventListener("input", function (e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredData = payrollData.filter(
      (employee) =>
        employee.employee.toLowerCase().includes(searchTerm) ||
        employee.department.toLowerCase().includes(searchTerm)
    );
    renderPayrollTable(filteredData);
  });

  // Handle filter changes
  departmentFilter.addEventListener("change", function () {
    const department = this.value;
    const filteredData = department
      ? payrollData.filter(
          (emp) => emp.department.toLowerCase() === department.toLowerCase()
        )
      : payrollData;
    renderPayrollTable(filteredData);
  });

  statusFilter.addEventListener("change", function () {
    const status = this.value;
    const filteredData = status
      ? payrollData.filter(
          (emp) => emp.status.toLowerCase() === status.toLowerCase()
        )
      : payrollData;
    renderPayrollTable(filteredData);
  });

  // Initialize the table
  renderPayrollTable();
});
