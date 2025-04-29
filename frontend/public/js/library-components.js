// Header and Footer Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Scroll effect for header
    const header = document.querySelector('.library-header');
    const headerTopBar = document.querySelector('.header-top-bar');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        headerTopBar.style.opacity = '0';
        headerTopBar.style.height = '0';
        headerTopBar.style.overflow = 'hidden';
      } else {
        header.style.boxShadow = 'none';
        headerTopBar.style.opacity = '1';
        headerTopBar.style.height = 'auto';
      }
    });
  
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
  
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
  
    // Animate footer items on scroll
    const footerItems = document.querySelectorAll('.footer-links li, .footer-contact p, .footer-newsletter');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = `fadeInUp 0.5s ${entry.target.dataset.delay || '0s'} forwards`;
        }
      });
    }, { threshold: 0.1 });
  
    footerItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.dataset.delay = `${index * 0.1}s`;
      observer.observe(item);
    });
  });
  
  // Add this to your CSS for the animation:
  /*
  @keyframes fadeInUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  */