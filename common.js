// Common functionality for all dashboard pages
document.addEventListener("DOMContentLoaded", function () {
  // Set active nav item based on current page
  const currentPage =
    window.location.pathname.split("/").pop() || "hr-dashboard.html";
  const navLinks = document.querySelectorAll(".nav-links li");

  navLinks.forEach((link) => {
    const href = link.querySelector("a").getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Handle search functionality
  const searchInput = document.querySelector(".search-bar input");
  if (searchInput) {
    // Remove any existing event listeners
    const newSearchInput = searchInput.cloneNode(true);
    searchInput.parentNode.replaceChild(newSearchInput, searchInput);

    newSearchInput.addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase();
      // Only trigger search if there's actual content
      if (searchTerm.length > 0) {
        handleSearch(searchTerm);
      }
    });
  }

  // Debounce function to limit how often a function can fire
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Handle responsive sidebar
  const handleResponsiveSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    if (window.innerWidth <= 1024) {
      sidebar.classList.add("collapsed");
      mainContent.classList.add("expanded");
    } else {
      sidebar.classList.remove("collapsed");
      mainContent.classList.remove("expanded");
    }
  };

  // Debounced version of handleResponsiveSidebar
  const debouncedHandleResponsiveSidebar = debounce(
    handleResponsiveSidebar,
    250
  );

  // Initial check and event listener for responsive sidebar
  handleResponsiveSidebar();
  window.addEventListener("resize", debouncedHandleResponsiveSidebar);

  // Handle notifications
  const showNotification = (message, type = "info", duration = 3000) => {
    // Remove any existing notifications
    const existingNotifications = document.querySelectorAll(".notification");
    existingNotifications.forEach((notification) => notification.remove());

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas ${
        type === "success" ? "fa-check-circle" : "fa-info-circle"
      }"></i>
      <span>${message}</span>
    `;
    document.body.appendChild(notification);

    // Show notification
    requestAnimationFrame(() => notification.classList.add("show"));

    // Remove notification after duration
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, duration);
  };

  // Make notification function globally available
  window.showNotification = showNotification;

  // Handle logout
  const logoutBtn = document.querySelector(".logout a");
  if (logoutBtn) {
    // Remove any existing event listeners
    const newLogoutBtn = logoutBtn.cloneNode(true);
    logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);

    newLogoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      // Clear any stored session data
      localStorage.removeItem("userToken");
      localStorage.removeItem("userRole");
      // Redirect to login page
      window.location.href = "login.html";
    });
  }

  // Handle user profile dropdown
  const userProfile = document.querySelector(".user-profile");
  if (userProfile) {
    // Remove any existing event listeners
    const newUserProfile = userProfile.cloneNode(true);
    userProfile.parentNode.replaceChild(newUserProfile, userProfile);

    newUserProfile.addEventListener("click", function () {
      // Implement profile dropdown functionality
      console.log("Profile clicked");
    });
  }
});

// Search handler function
function handleSearch(searchTerm) {
  // Get the current page
  const currentPage = window.location.pathname.split("/").pop();

  // Log the search term and current page for debugging
  console.log(`Searching for "${searchTerm}" on page "${currentPage}"`);

  // The actual search implementation should be handled by the specific page's JavaScript
  // This function now just logs the search request
}

// Export functions for use in other files
window.handleSearch = handleSearch;
window.showNotification = window.showNotification;
