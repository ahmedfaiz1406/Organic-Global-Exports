<script>
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Mobile Menu Toggle
    setupMobileMenu();
    
    // Smooth Scrolling
    setupSmoothScrolling();
    
    // Navbar Scroll Effect
    setupNavbarScroll();
    
    // Initialize animations
    setupAnimations();
}

function setupMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navLinks.classList.remove('active');
            }
        });
    }
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                document.querySelector('.nav-links').classList.remove('active');
            }
        });
    });
}

function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255,255,255,0.95)';
                navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'white';
                navbar.style.boxShadow = 'none';
            }
        });
    }
}

function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Form Handling
function handleFormSubmit(formObject) {
    event.preventDefault();
    
    // Show loading state
    const submitButton = formObject.querySelector('button[type="submit"]');
    submitButton.classList.add('button-loading');
    submitButton.disabled = true;

    // Get form data
    const formData = {
        name: formObject.name.value,
        email: formObject.email.value,
        message: formObject.message.value
    };

    // Submit form using Google Apps Script
    google.script.run
        .withSuccessHandler(function(response) {
            submitButton.classList.remove('button-loading');
            submitButton.disabled = false;

            if (response.success) {
                showFormFeedback('Message sent successfully!', 'success');
                formObject.reset();
            } else {
                showFormFeedback('Error sending message. Please try again.', 'error');
            }
        })
        .withFailureHandler(function(error) {
            submitButton.classList.remove('button-loading');
            submitButton.disabled = false;
            showFormFeedback('Error sending message. Please try again.', 'error');
        })
        .processForm(formData);
}

function showFormFeedback(message, type) {
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = `form-feedback ${type}`;
    feedbackDiv.textContent = message;

    const form = document.getElementById('contactForm');
    const existingFeedback = form.querySelector('.form-feedback');
    
    if (existingFeedback) {
        existingFeedback.remove();
    }

    form.insertBefore(feedbackDiv, form.firstChild);

    // Remove feedback after 5 seconds
    setTimeout(() => {
        feedbackDiv.remove();
    }, 5000);
}

// Product button handling
document.querySelectorAll('.product-button').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.parentElement.querySelector('h3').textContent;
        alert(`You clicked on ${productName}. Contact us for more information!`);
    });
});

// Newsletter form handling (if you add it later)
function handleNewsletterSubmit(form) {
    event.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    // Add newsletter subscription logic here
    alert(`Thank you for subscribing with: ${email}`);
    form.reset();
}
</script>
