document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  const settingsNav = document.querySelector(".settings-nav");
  const settingsSections = document.querySelectorAll(".settings-section");
  const saveBtn = document.querySelector(".save-btn");
  const cancelBtn = document.querySelector(".cancel-btn");

  // Navigation functionality
  settingsNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);

      // Update active nav item
      settingsNav
        .querySelectorAll("li")
        .forEach((li) => li.classList.remove("active"));
      link.parentElement.classList.add("active");

      // Show corresponding section
      settingsSections.forEach((section) => {
        section.classList.remove("active");
        if (section.id === targetId) {
          section.classList.add("active");
        }
      });
    });
  });

  // Save settings functionality
  saveBtn?.addEventListener("click", () => {
    // Show loading state
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    saveBtn.disabled = true;

    // Get all form data
    const settings = {
      general: getGeneralSettings(),
      company: getCompanySettings(),
      departments: getDepartmentSettings(),
      leaveTypes: getLeaveTypeSettings(),
      payroll: getPayrollSettings(),
      notifications: getNotificationSettings(),
      security: getSecuritySettings(),
    };

    // Simulate API call
    setTimeout(() => {
      console.log("Saving settings:", settings);
      saveBtn.innerHTML = "Save Changes";
      saveBtn.disabled = false;
      showNotification("Settings saved successfully!", "success");
    }, 1500);
  });

  // Cancel changes functionality
  cancelBtn?.addEventListener("click", () => {
    if (confirm("Are you sure you want to discard changes?")) {
      location.reload();
    }
  });

  // Logo upload functionality
  const logoUpload = document.querySelector(".logo-upload button");
  logoUpload?.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          document.querySelector(".logo-upload img").src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  });

  // Department management
  document.querySelectorAll(".department-actions .edit-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const item = e.target.closest(".department-item");
      const name = item.querySelector("h4").textContent;
      const newName = prompt("Enter new department name:", name);
      if (newName && newName !== name) {
        item.querySelector("h4").textContent = newName;
        showNotification("Department updated successfully!", "success");
      }
    });
  });

  document
    .querySelectorAll(".department-actions .delete-btn")
    .forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const item = e.target.closest(".department-item");
        if (confirm("Are you sure you want to delete this department?")) {
          item.remove();
          showNotification("Department deleted successfully!", "success");
        }
      });
    });

  // Helper functions to get settings data
  function getGeneralSettings() {
    const generalSection = document.getElementById("general");
    return {
      language: generalSection.querySelector("select:nth-child(1)").value,
      timezone: generalSection.querySelector("select:nth-child(2)").value,
      dateFormat: generalSection.querySelector("select:nth-child(3)").value,
      theme: generalSection.querySelector("select:nth-child(4)").value,
    };
  }

  function getCompanySettings() {
    const companySection = document.getElementById("company");
    return {
      name: companySection.querySelector('input[type="text"]').value,
      address: companySection.querySelector("textarea").value,
      email: companySection.querySelector('input[type="email"]').value,
      phone: companySection.querySelector('input[type="tel"]').value,
      logo: companySection.querySelector(".logo-upload img").src,
    };
  }

  function getDepartmentSettings() {
    return Array.from(document.querySelectorAll(".department-item")).map(
      (item) => ({
        name: item.querySelector("h4").textContent,
        employeeCount: parseInt(item.querySelector("p").textContent),
      })
    );
  }

  function getLeaveTypeSettings() {
    return Array.from(document.querySelectorAll(".leave-type-item")).map(
      (item) => ({
        name: item.querySelector("h4").textContent,
        days: parseInt(item.querySelector("p").textContent),
      })
    );
  }

  function getPayrollSettings() {
    const payrollSection = document.getElementById("payroll");
    return {
      payPeriod: payrollSection.querySelector("select:nth-child(1)").value,
      currency: payrollSection.querySelector("select:nth-child(2)").value,
      tax: {
        enabled: payrollSection.querySelector('input[type="checkbox"]').checked,
        rate: parseFloat(
          payrollSection.querySelector('input[type="number"]').value
        ),
      },
    };
  }

  function getNotificationSettings() {
    const notificationSection = document.getElementById("notifications");
    return {
      email: {
        leaveRequests:
          notificationSection.querySelector("input:nth-child(1)").checked,
        payroll:
          notificationSection.querySelector("input:nth-child(2)").checked,
        performance:
          notificationSection.querySelector("input:nth-child(3)").checked,
        systemUpdates:
          notificationSection.querySelector("input:nth-child(4)").checked,
      },
      system: {
        desktop:
          notificationSection.querySelector("input:nth-child(5)").checked,
        browser:
          notificationSection.querySelector("input:nth-child(6)").checked,
      },
    };
  }

  function getSecuritySettings() {
    const securitySection = document.getElementById("security");
    return {
      passwordPolicy: {
        specialChars:
          securitySection.querySelector("input:nth-child(1)").checked,
        numbers: securitySection.querySelector("input:nth-child(2)").checked,
        minLength: securitySection.querySelector("input:nth-child(3)").checked,
      },
      twoFactor: securitySection.querySelector("#2fa").checked,
      sessionTimeout: parseInt(securitySection.querySelector("select").value),
    };
  }

  // Notification helper
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
            <i class="fas fa-${
              type === "success" ? "check-circle" : "info-circle"
            }"></i>
            <span>${message}</span>
        `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }, 100);
  }
});
