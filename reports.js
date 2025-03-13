document.addEventListener("DOMContentLoaded", function () {
  // Initialize variables
  const generateBtn = document.querySelector(".generate-btn");
  const generateModal = document.getElementById("generateReportModal");
  const generateForm = document.getElementById("generateReportForm");

  // Show modal when Generate Report button is clicked
  generateBtn?.addEventListener("click", () => {
    generateModal.style.display = "block";
  });

  // Close modal when Cancel button is clicked
  document.querySelector(".cancel-btn")?.addEventListener("click", () => {
    generateModal.style.display = "none";
  });

  // Handle form submission
  generateForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    generateReport(getFormData());
    generateModal.style.display = "none";
  });

  // View report functionality
  document.querySelectorAll(".view-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".report-card");
      const reportType = card.querySelector("h3").textContent;
      viewReport(reportType);
    });
  });

  // Download report functionality
  document.querySelectorAll(".download-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".report-card");
      const reportType = card.querySelector("h3").textContent;
      downloadReport(reportType);
    });
  });

  // Helper function to get form data
  function getFormData() {
    const form = document.getElementById("generateReportForm");
    const formData = {
      reportType: form.querySelector("select:nth-child(1)").value,
      dateRange: {
        from: form.querySelector(".date-range input:nth-child(1)").value,
        to: form.querySelector(".date-range input:nth-child(3)").value,
      },
      format: form.querySelector("select:nth-child(3)").value,
      include: {
        charts: form.querySelector(".checkbox-group input:nth-child(1)")
          .checked,
        summary: form.querySelector(".checkbox-group input:nth-child(2)")
          .checked,
        details: form.querySelector(".checkbox-group input:nth-child(3)")
          .checked,
      },
    };
    return formData;
  }

  // Helper function to generate report
  function generateReport(data) {
    console.log("Generating report with data:", data);
    // Add report generation logic here
    // This would typically involve an API call to the backend

    // Show loading state
    const generateBtn = document.querySelector(".generate-btn");
    const originalText = generateBtn.innerHTML;
    generateBtn.innerHTML =
      '<i class="fas fa-spinner fa-spin"></i> Generating...';
    generateBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      generateBtn.innerHTML = originalText;
      generateBtn.disabled = false;
      alert("Report generated successfully!");
    }, 2000);
  }

  // Helper function to view report
  function viewReport(reportType) {
    console.log("Viewing report:", reportType);
    // Add view logic here
    // This would typically open a new window or modal with the report preview

    // Simulate loading report
    alert(
      `Viewing ${reportType}...\nThis would typically open a report preview.`
    );
  }

  // Helper function to download report
  function downloadReport(reportType) {
    console.log("Downloading report:", reportType);
    // Add download logic here
    // This would typically trigger a file download

    // Show loading state
    const downloadBtn = document.querySelector(".download-btn");
    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    downloadBtn.disabled = true;

    // Simulate download
    setTimeout(() => {
      downloadBtn.innerHTML = originalText;
      downloadBtn.disabled = false;
      alert(`${reportType} downloaded successfully!`);
    }, 1500);
  }

  // Add report card hover effects
  document.querySelectorAll(".report-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
    });
  });
});
