// PSSM Home Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Initialize all components
    initNavbar();
    initCarousel();
    initSmoothScrolling();
    initAnimations();
    initContactForm();
    initGallery();
    initScrollEffects();

    // Navbar functionality
    function initNavbar() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });

        // Active navigation link highlighting
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Close mobile menu when clicking on a link
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 992) {
                    navbarCollapse.classList.remove('show');
                }
            });
        });
    }

    // Carousel functionality
    function initCarousel() {
        const carousel = document.getElementById('heroCarousel');
        if (carousel) {
            // Auto-play carousel
            const carouselInstance = new bootstrap.Carousel(carousel, {
                interval: 5000,
                pause: 'hover',
                wrap: true
            });

            // Pause carousel on hover
            carousel.addEventListener('mouseenter', function() {
                carouselInstance.pause();
            });

            carousel.addEventListener('mouseleave', function() {
                carouselInstance.cycle();
            });

            // Add loading animation to carousel items
            const carouselItems = carousel.querySelectorAll('.carousel-item');
            carouselItems.forEach((item, index) => {
                if (index === 0) {
                    item.classList.add('loading');
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, 100);
                }
            });
        }
    }

    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Scroll animations
    function initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.service-card, .feature-item, .gallery-img, .quote-card');
        animateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Contact form functionality
    function initContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const name = this.querySelector('input[type="text"]').value;
                const email = this.querySelector('input[type="email"]').value;
                const subject = this.querySelector('input[placeholder="Subject"]').value;
                const message = this.querySelector('textarea').value;
                
                // Basic validation
                if (!name || !email || !message) {
                    showNotification('Please fill in all required fields.', 'error');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    showNotification('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Simulate form submission
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    this.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }

    // Gallery functionality
    function initGallery() {
        const galleryImages = document.querySelectorAll('.gallery-img');
        
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                openLightbox(this.src, this.alt);
            });
        });
    }

    // Lightbox functionality
    function openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${src}" alt="${alt}" class="lightbox-image">
                <div class="lightbox-caption">${alt}</div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        
        // Close lightbox
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                document.body.removeChild(lightbox);
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        });
    }

    // Scroll effects
    function initScrollEffects() {
        let ticking = false;
        
        function updateScrollEffects() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick);
    }

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 30px;
            cursor: pointer;
            background: none;
            border: none;
        }
        
        .lightbox-caption {
            position: absolute;
            bottom: -40px;
            left: 0;
            color: white;
            text-align: center;
            width: 100%;
        }
        
        .navbar-scrolled {
            background: rgba(33, 37, 41, 0.95) !important;
            backdrop-filter: blur(10px);
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Add loading states
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove loading animation from carousel
        const firstCarouselItem = document.querySelector('.carousel-item.active');
        if (firstCarouselItem) {
            firstCarouselItem.classList.remove('loading');
        }
    });

    // Keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        // Navigate carousel with arrow keys
        if (e.key === 'ArrowLeft') {
            const prevBtn = document.querySelector('.carousel-control-prev');
            if (prevBtn) prevBtn.click();
        }
        if (e.key === 'ArrowRight') {
            const nextBtn = document.querySelector('.carousel-control-next');
            if (nextBtn) nextBtn.click();
        }
    });

    // Touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                const nextBtn = document.querySelector('.carousel-control-next');
                if (nextBtn) nextBtn.click();
            } else {
                // Swipe right - previous slide
                const prevBtn = document.querySelector('.carousel-control-prev');
                if (prevBtn) prevBtn.click();
            }
        }
    }

    // Testimonials Carousel Navigation
    function moveCarousel(direction) {
        const track = document.getElementById('carouselTrack');
        const cards = document.querySelectorAll('.testimonial-card');
        const cardWidth = 350 + 30; // card width + gap
        
        if (track) {
            const currentPosition = parseInt(track.style.transform.replace('translateX(', '').replace('px)', '') || 0);
            const newPosition = currentPosition - (direction * cardWidth);
            
            // Reset to beginning if we've scrolled too far
            if (Math.abs(newPosition) > cards.length * cardWidth) {
                track.style.transform = 'translateX(0px)';
            } else {
                track.style.transform = `translateX(${newPosition}px)`;
            }
        }
    }

    // Pause auto-scroll when hovering over carousel
    const carouselTrack = document.getElementById('carouselTrack');
    if (carouselTrack) {
        carouselTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        carouselTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }

    // Video Modal Functionality
    function openVideoModal(cardElement) {
        const videoUrl = cardElement.getAttribute('data-video');
        const modal = document.getElementById('videoModal');
        const videoIframe = document.getElementById('modalVideo');
        
        if (videoUrl && modal && videoIframe) {
            videoIframe.src = videoUrl;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    }

    function closeVideoModal() {
        const modal = document.getElementById('videoModal');
        const videoIframe = document.getElementById('modalVideo');
        
        if (modal && videoIframe) {
            modal.style.display = 'none';
            videoIframe.src = ''; // Stop video playback
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    }

    // Close modal when clicking outside or on close button
    document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById('videoModal');
        const closeBtn = document.querySelector('.close-modal');
        
        if (modal) {
            // Close when clicking outside the modal
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeVideoModal();
                }
            });
            
            // Close when clicking the close button
            if (closeBtn) {
                closeBtn.addEventListener('click', closeVideoModal);
            }
            
            // Close with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    closeVideoModal();
                }
            });
        }
    });

    console.log('PSSM Home Page initialized successfully!');
});
