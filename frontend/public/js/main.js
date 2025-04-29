// API Configuration
const API_BASE_URL = "http://localhost:3000/api";
const RECENT_SEARCHES_KEY = 'libraryRecentSearches';

// DOM Elements
const appContent = document.getElementById("app-content");
const themeToggle = document.querySelector(".theme-toggle");
const backToTopBtn = document.getElementById("back-to-top");

// Initialize the application
document.addEventListener("DOMContentLoaded", function() {
  initializeTheme();
    // Initialize animations
    initAnimations();
  
    // Add hover effects to cards
    setupCardHoverEffects();
    
    // Add scroll reveal effects
    setupScrollReveal();
  setupBackToTopButton();
  setupSmoothScrolling();
  setupHeaderScrollEffects();
  setupSearchFunctionality();
  loadHomePage();
});

function initAnimations() {
  // Animate elements with data-aos attributes
  AOS.init({
    duration: 800,
    easing: 'ease-out-quad',
    once: true,
    offset: 100
  });
  
  // Add ripple effect to buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 1000);
    });
  });
}

function setupCardHoverEffects() {
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.feature-card, .stats-card, .testimonial-card').forEach(el => {
    observer.observe(el);
  });
}

// Theme Management
function initializeTheme() {
  // Set initial theme
  const savedTheme = localStorage.getItem("theme") || "light";
  document.body.setAttribute("data-bs-theme", savedTheme);
  
  // Set correct icon
  const icon = themeToggle.querySelector("i");
  if (savedTheme === "dark") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
  
  // Setup toggle handler
  themeToggle.addEventListener("click", toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.body.getAttribute("data-bs-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  
  document.body.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  
  // Update icon
  const icon = themeToggle.querySelector("i");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
  
  // Add animation class for smooth transition
  document.body.classList.add('theme-transition');
  setTimeout(() => {
    document.body.classList.remove('theme-transition');
  }, 500);
}

// Back to Top Button
function setupBackToTopButton() {
  window.addEventListener("scroll", function() {
    backToTopBtn.classList.toggle("active", window.scrollY > 300);
  });

  backToTopBtn.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

// Smooth Scrolling
function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector(".fixed-header").offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });
}

// Header Scroll Effects
function setupHeaderScrollEffects() {
  const header = document.querySelector(".fixed-header");
  const navbar = document.querySelector(".navbar");
  
  if (!header || !navbar) return;
  
  window.addEventListener("scroll", function() {
    const scrollPosition = window.scrollY;
    header.classList.toggle("scrolled", scrollPosition > 50);
    navbar.classList.toggle("scrolled", scrollPosition > 50);
  });
}

// Search Functionality
function setupSearchFunctionality() {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchQuery");
  const searchSuggestions = document.querySelector(".search-suggestions");
  
  if (!searchForm || !searchInput || !searchSuggestions) return;
  
  // Form submission
  searchForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      performSearch(query);
    }
  });
  
  // Input handling
  searchInput.addEventListener("input", function() {
    const query = this.value.trim();
    if (query.length > 2) {
      fetchSearchSuggestions(query);
    } else {
      clearSearchSuggestions();
    }
  });
  
  // Focus handling
  searchInput.addEventListener("focus", function() {
    if (this.value.trim().length > 2) {
      fetchSearchSuggestions(this.value.trim());
    } else {
      showRecentSearches();
    }
  });
  
  // Click outside handling
  document.addEventListener("click", function(e) {
    if (!searchForm.contains(e.target)) {
      clearSearchSuggestions();
    }
  });
  
  // Keyboard navigation
  searchInput.addEventListener("keydown", function(e) {
    const suggestions = document.querySelectorAll(".search-suggestion-item");
    let activeIndex = -1;
    
    suggestions.forEach((item, index) => {
      if (item.classList.contains("active")) {
        activeIndex = index;
        item.classList.remove("active");
      }
    });
    
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (activeIndex + 1) % suggestions.length;
      suggestions[nextIndex].classList.add("active");
      suggestions[nextIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (activeIndex - 1 + suggestions.length) % suggestions.length;
      suggestions[prevIndex].classList.add("active");
      suggestions[prevIndex].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      suggestions[activeIndex].click();
    }
  });
}

// Search Operations
function performSearch(query) {
  if (!query) return;
  
  // Add to recent searches
  addToRecentSearches(query);
  
  // Show loading state
  const searchForm = document.getElementById("searchForm");
  if (searchForm) searchForm.classList.add("search-loading");
  
  // Perform search (replace with actual API call)
  setTimeout(() => {
    console.log("Searching for:", query);
    window.location.href = `search.html?q=${encodeURIComponent(query)}`;
    if (searchForm) searchForm.classList.remove("search-loading");
    clearSearchSuggestions();
  }, 800);
}

function fetchSearchSuggestions(query) {
  // Simulate API call - replace with actual API call in production
  setTimeout(() => {
    const mockSuggestions = [
      { title: `${query} - Research Papers`, type: "paper" },
      { title: `${query} - Books`, type: "book" },
      { title: `${query} - Journal Articles`, type: "article" },
      { title: `${query} - Multimedia`, type: "media" }
    ];
    
    displaySearchSuggestions(mockSuggestions);
  }, 300);
}

function displaySearchSuggestions(suggestions) {
  const searchSuggestions = document.querySelector(".search-suggestions");
  if (!searchSuggestions) return;
  
  if (suggestions.length === 0) {
    searchSuggestions.innerHTML = '<div class="search-suggestion-item text-muted p-3">No suggestions found</div>';
  } else {
    searchSuggestions.innerHTML = suggestions.map(item => `
      <div class="search-suggestion-item" data-query="${item.title}">
        <div class="d-flex align-items-center">
          <i class="fas fa-${getIconForType(item.type)} me-2 text-primary"></i>
          <div>${item.title}</div>
        </div>
      </div>
    `).join("");
    
    // Add click handlers
    document.querySelectorAll(".search-suggestion-item").forEach(item => {
      item.addEventListener("click", function() {
        const searchInput = document.getElementById("searchQuery");
        if (searchInput) {
          searchInput.value = this.getAttribute("data-query").replace(/ - .*$/, "");
          performSearch(searchInput.value.trim());
        }
      });
    });
  }
  
  searchSuggestions.style.display = "block";
}

function showRecentSearches() {
  const searchSuggestions = document.querySelector(".search-suggestions");
  if (!searchSuggestions) return;
  
  const recentSearches = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
  if (recentSearches.length > 0) {
    searchSuggestions.innerHTML = `
      <div class="p-2 text-muted">Recent searches</div>
      ${recentSearches.map(item => `
        <div class="search-suggestion-item" data-query="${item}">
          <i class="fas fa-history me-2"></i>
          ${item}
        </div>
      `).join("")}
    `;
    
    // Add click handlers
    document.querySelectorAll(".search-suggestion-item").forEach(item => {
      item.addEventListener("click", function() {
        const searchInput = document.getElementById("searchQuery");
        if (searchInput) {
          searchInput.value = this.getAttribute("data-query");
          performSearch(searchInput.value.trim());
        }
      });
    });
    
    searchSuggestions.style.display = "block";
  }
}

function addToRecentSearches(query) {
  const recentSearches = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY)) || [];
  if (!recentSearches.includes(query)) {
    recentSearches.unshift(query);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches.slice(0, 5)));
  }
}

function clearSearchSuggestions() {
  const searchSuggestions = document.querySelector(".search-suggestions");
  if (searchSuggestions) {
    searchSuggestions.innerHTML = "";
    searchSuggestions.style.display = "none";
  }
}

function getIconForType(type) {
  const icons = {
    "book": "book",
    "paper": "file-alt",
    "article": "newspaper",
    "media": "film"
  };
  return icons[type] || "search";
}

// Page Content Loading
function loadHomePage() {
  // This would be replaced with actual content loading logic
  console.log("Home page loaded");
}

function loadBooks() {
  fetch(`${API_BASE_URL}/books`)
    .then(response => response.json())
    .then(books => {
      appContent.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="text-primary mb-0">Book Collection</h4>
          <button class="btn btn-primary" onclick="showAddBookForm()">
            <i class="fas fa-plus me-1"></i> Add Book
          </button>
        </div>
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${books.map(book => `
                <tr>
                  <td>${book.title}</td>
                  <td>${book.author}</td>
                  <td>${book.availableCopies}/${book.totalCopies}</td>
                  <td>
                    <button class="btn btn-sm btn-outline-primary me-1">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-success me-1">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    })
    .catch(error => {
      console.error("Error:", error);
      showError("Failed to load books");
    });
}

function showAddBookForm() {
  appContent.innerHTML = `
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header bg-white">
            <h5 class="text-primary mb-0">Add New Book</h5>
          </div>
          <div class="card-body">
            <form id="addBookForm">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" class="form-control" id="title" required>
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">Author</label>
                <input type="text" class="form-control" id="author" required>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="isbn" class="form-label">ISBN</label>
                  <input type="text" class="form-control" id="isbn" required>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="year" class="form-label">Published Year</label>
                  <input type="number" class="form-control" id="year" required>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="genre" class="form-label">Genre</label>
                  <select class="form-select" id="genre" required>
                    <option value="">Select genre</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Biography">Biography</option>
                  </select>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="copies" class="form-label">Total Copies</label>
                  <input type="number" class="form-control" id="copies" min="1" value="1" required>
                </div>
              </div>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-secondary me-md-2" onclick="loadBooks()">Cancel</button>
                <button type="submit" class="btn btn-primary">Add Book</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("addBookForm").addEventListener("submit", handleAddBook);
}

function handleAddBook(e) {
  e.preventDefault();

  const bookData = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    isbn: document.getElementById("isbn").value,
    publishedYear: document.getElementById("year").value,
    genre: document.getElementById("genre").value,
    totalCopies: document.getElementById("copies").value,
    availableCopies: document.getElementById("copies").value
  };

  fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify(bookData)
  })
    .then(response => response.json())
    .then(data => {
      showSuccess("Book added successfully!");
      loadBooks();
    })
    .catch(error => {
      console.error("Error:", error);
      showError("Failed to add book");
    });
}

// Utility Functions
function showSuccess(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
    stopOnFocus: true
  }).showToast();
}

function showError(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
    stopOnFocus: true
  }).showToast();
}

// Make functions available globally
window.loadHomePage = loadHomePage;
window.loadBooks = loadBooks;
window.showAddBookForm = showAddBookForm;