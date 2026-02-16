// ===========================
// FARMERZ MARKET - COMPLETE JAVASCRIPT
// =========================== */

// Global Variables
let cartCount = 0;

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeCartCounter();
    initializeFormHandling();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeActiveNavLink();
    console.log('Farmerz Market website loaded successfully');
    console.log('Contact: +27 688 359 960');
    console.log('WhatsApp: https://wa.me/27688359960');
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================

function initializeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ===========================
// CART COUNTER
// ===========================

function initializeCartCounter() {
    // Load cart count from localStorage
    const savedCartCount = localStorage.getItem('cartCount');
    if (savedCartCount) {
        cartCount = parseInt(savedCartCount);
        updateCartDisplay();
    }
}

function addToCart() {
    cartCount++;
    localStorage.setItem('cartCount', cartCount);
    updateCartDisplay();
    showCartNotification();
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function showCartNotification() {
    showToast('Item added to cart! (' + cartCount + ' items)');
}

// ===========================
// FORM HANDLING
// ===========================

function initializeFormHandling() {
    const quotationForm = document.getElementById('quotationForm');
    
    if (quotationForm) {
        quotationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const eventDate = document.getElementById('event-date').value;
            const meatType = document.getElementById('meat-type').value;
            const quantity = document.getElementById('quantity').value;
            const requirements = document.getElementById('requirements').value;
            
            // Validate form
            if (!name || !email || !phone || !eventDate || !meatType || !quantity) {
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            // Validate email
            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Log form submission
            console.log('Quotation Form Submitted:', {
                name: name,
                email: email,
                phone: phone,
                eventDate: eventDate,
                meatType: meatType,
                quantity: quantity,
                requirements: requirements
            });
            
            // Show success message
            showToast('Thank you! Your quotation request has been received. We will contact you soon.', 'success');
            
            // Reset form
            quotationForm.reset();
            
            // Optionally send to WhatsApp
            setTimeout(() => {
                const whatsappMessage = `Hi! I'd like to request a quotation:\n\nName: <LaTex>${name}\nEmail: $</LaTex>{email}\nPhone: <LaTex>${phone}\nEvent Date: $</LaTex>{eventDate}\nMeat Type: <LaTex>${meatType}\nQuantity: $</LaTex>{quantity}kg\nSpecial Requirements: <LaTex>${requirements}`;
                const whatsappUrl = `https://wa.me/27688359960?text=$</LaTex>{encodeURIComponent(whatsappMessage)}`;
                // Uncomment to auto-open WhatsApp
                // window.open(whatsappUrl, '_blank');
            }, 1000);
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===========================
// SMOOTH SCROLL ENHANCEMENT
// ===========================

function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Calculate offset for sticky navbar
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe product cards
    const productCards = document.querySelectorAll('.product-card, .combo-card, .stat-card, .value-card');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// ===========================
// ACTIVE NAVIGATION LINK
// ===========================

function initializeActiveNavLink() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Add active class styling
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--secondary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ===========================
// TOAST NOTIFICATION
// ===========================

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    
    let backgroundColor = '#333';
    let textColor = 'white';
    
    if (type === 'success') {
        backgroundColor = '#4caf50';
        textColor = 'white';
    } else if (type === 'error') {
        backgroundColor = '#f44336';
        textColor = 'white';
    } else if (type === 'info') {
        backgroundColor = '#2196f3';
        textColor = 'white';
    }
    
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 20px;
        background-color: ${backgroundColor};
        color: ${textColor};
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        z-index: 998;
        animation: slideInUp 0.3s ease;
        font-weight: 500;
        max-width: 300px;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Add animation keyframes for toast
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(toastStyle);

// ===========================
// LAZY LOAD IMAGES
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// ===========================
// KEYBOARD NAVIGATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .btn');
    
    navLinks.forEach((link) => {
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// ===========================
// ACCESSIBILITY: SKIP TO MAIN CONTENT
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const skipLink = document.createElement('a');
    skipLink.href = '#products';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--secondary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 100;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// ===========================
// PRODUCT INTERACTION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card, .combo-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
    });
});

// ===========================
// WHATSAPP INTEGRATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    
    if (whatsappButton) {
        whatsappButton.addEventListener('click', function(e) {
            console.log('WhatsApp button clicked');
        });
    }
});

// ===========================
// PAGE LOAD COMPLETE
// ===========================

window.addEventListener('load', function() {
    console.log('All resources loaded');
    console.log('Website is fully operational');
});

// ===========================
// ERROR HANDLING
// ===========================

window.addEventListener('error', function(event) {
    console.error('Error occurred:', event.error);
});

// ===========================
// PERFORMANCE MONITORING
// ===========================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}
