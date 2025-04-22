import './styles/style.scss'

document.addEventListener('DOMContentLoaded', function() {
  // Hamburger menu for mobile view
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', function() {
      // Toggle hamburger button animation
      this.classList.toggle('open');
      
      // Toggle menu visibility
      navMenu.classList.toggle('open');
      
      // Toggle body scroll lock when menu is open
      if (navMenu.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown .nav-link)');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 425) {
          hamburgerBtn.classList.remove('open');
          navMenu.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });
    
    // Handle window resize to reset menu state
    window.addEventListener('resize', function() {
      if (window.innerWidth > 425) {
        hamburgerBtn.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Menu dropdown
  const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
  
  if (dropdownItems.length > 0) {
    // Add click event to each dropdown item
    dropdownItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      
      link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent navigation
        
        // Toggle the active class
        const isActive = item.classList.contains('active');
        
        // Close all dropdown menus
        dropdownItems.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
        
        // If it was not active, activate it
        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
    
    // Close the menu when clicking outside of it
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-item.dropdown')) {
        dropdownItems.forEach(dropdown => {
          dropdown.classList.remove('active');
        });
      }
    });
  }

  // Sound control for the main video
  const video = document.getElementById('mainVideo');
  const soundToggle = document.getElementById('soundToggle');
  const soundIcon = soundToggle ? soundToggle.querySelector('.sound-icon') : null;
  
  if (video && soundToggle && soundIcon) {
    // Initially configure the video without silence for the first playback
    video.muted = false;
    
    // Update the initial icon
    soundIcon.textContent = '🔊';
    
    // Variable to control if we are in the first playback
    let firstPlay = true;
    
    // Detect when the video ends and starts again
    video.addEventListener('ended', function() {
      if (firstPlay) {
        // If it is the first playback, silence for the next ones
        video.muted = true;
        soundIcon.textContent = '🔇';
        firstPlay = false;
      }
      
      // Restart the video to create the loop effect
      video.currentTime = 0;
      video.play();
    });
    
    soundToggle.addEventListener('click', function() {
      // Toggle the audio state of the video
      video.muted = !video.muted;
      
      // Update the icon according to the state
      if (video.muted) {
        soundIcon.textContent = '🔇';
      } else {
        soundIcon.textContent = '🔊';
        

        firstPlay = true;
      }
    });
    

    video.play().catch(error => {
      console.log('The automatic playback with sound was blocked by the browser');
      console.log(error);
      
      // If the automatic playback with sound was blocked, try without sound
      video.muted = true;
      soundIcon.textContent = '🔇';
      firstPlay = false; // It is not the first playback if we had to silence
      
      video.play().catch(err => {
        console.log('The automatic playback was also blocked without sound');
      });
    });
  }
  
  // Smooth scroll for the arrow button - Improved implementation
  const scrollDownBtn = document.getElementById('scrollDownButton');
  console.log('Arrow button scroll-down by ID:', scrollDownBtn);
  
  if (!scrollDownBtn) {
    // Intento alternativo por clase
    const scrollDownByClass = document.querySelector('.scroll-down');
    console.log('Botón scroll-down por clase:', scrollDownByClass);
    
    if (scrollDownByClass) {
      scrollDownBtn = scrollDownByClass;
    }
  }
  
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Click en botón scroll-down');
      
      const targetId = this.getAttribute('href');
      console.log('Target ID:', targetId);
      
      if (targetId) {
        // Method 1: querySelector
        const targetElement = document.querySelector(targetId);
        console.log('Target element by querySelector:', targetElement);
        
        if (targetElement) {
          // Smooth scroll to the element
          targetElement.scrollIntoView({ 
            behavior: 'smooth'
          });
        } else {
          // Method 2: getElementById (backup)
          const targetIdWithoutHash = targetId.substring(1);
          const targetElementById = document.getElementById(targetIdWithoutHash);
          console.log('Target element by ID:', targetElementById);
          
          if (targetElementById) {
            // Smooth scroll to the element
            targetElementById.scrollIntoView({ 
              behavior: 'smooth'
            });
          }
        }
      }
    });
  }

  // Animation of the teachers section
  const profesoresSection = document.querySelector('.profesores-section');
  
  if (profesoresSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1 // It is activated when 10% of the section is visible
    });
    
    observer.observe(profesoresSection);
  }

  // Animation of the counter for the numbers section
  const numberCards = document.querySelectorAll('.hero-numbers .number-card h2');
  let animationTriggered = false;
  
  if (numberCards.length > 0) {
    // Function to animate counters
    function animateCounter(element, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let currentCount = Math.floor(progress * (end - start) + start);
        
        // Format with the + sign to maintain consistency with the design
        element.textContent = currentCount > 999 ? `+${currentCount/1000}k` : `+${currentCount}`;
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          // Restore the original format when the animation ends
          element.textContent = element.getAttribute('data-original');
        }
      };
      window.requestAnimationFrame(step);
    }

    // Function to start all counters
    function startCounters() {
      numberCards.forEach(card => {
        // Save the original value
        const originalText = card.textContent;
        card.setAttribute('data-original', originalText);
        
        // Extract the number from the text
        let endValue = parseInt(originalText.replace(/\D/g, ''));
        
        // Determine if it is a value in thousands
        if (originalText.includes('k')) {
          endValue = endValue * 1000;
        }
        
        // Animate from 0 to the final value
        animateCounter(card, 0, endValue, 2000); // 2000ms = 2 seconds
      });
    }

    // Observer to detect when the section is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animationTriggered) {
          startCounters();
          animationTriggered = true; // To ensure it is only activated once
        }
      });
    }, {
      threshold: 0.3 // It is activated when 30% of the section is visible
    });

    // Observe the numbers section
    const heroNumbersSection = document.querySelector('.hero-numbers');
    if (heroNumbersSection) {
      observer.observe(heroNumbersSection);
    }
  }
  
  // Functionality for the video modal on the blog page
  const modal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('youtubeVideo');
  const closeButton = document.querySelector('.close-button');
  const videoLinks = document.querySelectorAll('.entrada__link[data-video-id]');
  
  if (modal && videoIframe && closeButton && videoLinks.length > 0) {
    // Open modal and load video when clicking on a link
    videoLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const videoId = this.getAttribute('data-video-id');
        videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scroll in the background
      });
    });
    
    // Close modal when clicking on the X
    closeButton.addEventListener('click', function() {
      closeModal();
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
    
    // Close modal with the ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
      }
    });
    
    // Function to close the modal
    function closeModal() {
      modal.style.display = 'none';
      videoIframe.src = ''; // Stop the video
      document.body.style.overflow = ''; // Restore scroll
    }
  }
  
  // Funcionalidad para la página de login
  const loginForm = document.querySelector('.login-form');
  const forgotPasswordLink = document.querySelector('.forgot-password a');
  const accessDeniedMessage = document.getElementById('accessDeniedMessage');
  const closeMessageButton = document.getElementById('closeMessage');
  
  if (loginForm && accessDeniedMessage && closeMessageButton) {
    // Show the access denied message when sending the login form
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent the real submission of the form
      
      // Show the access denied message
      accessDeniedMessage.classList.add('show');
    });
    
    // Show the access denied message when clicking on "Forgot your password"
    if (forgotPasswordLink) {
      forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent navigation
        
        // Show the access denied message
        accessDeniedMessage.classList.add('show');
      });
    }
    
    // Close the message when clicking on the button
    closeMessageButton.addEventListener('click', function() {
      accessDeniedMessage.classList.remove('show');
      
      // Clean the form
      loginForm.reset();
    });
  }
  
  // Functionality for the contact page
  const contactForm = document.getElementById('contactForm');
  const contactConfirmation = document.getElementById('contactConfirmation');
  const closeContactButton = contactConfirmation ? contactConfirmation.querySelector('.close-button') : null;
  
  if (contactForm && contactConfirmation && closeContactButton) {
    // Show the confirmation message when sending the contact form
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent the real submission of the form
      
      // Show the confirmation message
      contactConfirmation.classList.add('show');
      
      // Clean the form
      contactForm.reset();
    });
    
    // Close the message when clicking on the button
    closeContactButton.addEventListener('click', function() {
      contactConfirmation.classList.remove('show');
    });
  }

  // Animation for the "Quiénes Somos" page
  const profesores = document.querySelectorAll('.profesor');
  const valores = document.querySelector('.valores');
  
  if (profesores.length > 0 || valores) {
    // Function to verify if an element is visible in the window
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    }
    
    // Function to check visibility and add class
    function checkVisibility() {
      profesores.forEach(profesor => {
        if (isElementInViewport(profesor)) {
          profesor.classList.add('visible');
        }
      });
      
      if (valores && isElementInViewport(valores)) {
        valores.classList.add('visible');
      }
    }
    
    // execute when loading the page
    checkVisibility();
    
    // execute when scrolling
    window.addEventListener('scroll', checkVisibility);
  }
});
