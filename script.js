// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Newsletter form handling with Formspree
document.querySelector('.newsletter-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const button = this.querySelector('button');
    const originalText = button.textContent;
    
    if (email) {
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        try {
            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });
            
            if (response.ok) {
                button.textContent = '✓ Subscribed!';
                this.reset();
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 3000);
            }
        } catch (error) {
            console.error('Error:', error);
            button.textContent = originalText;
            button.disabled = false;
        }
    }
});

// Contact form handling with Formspree
document.querySelector('.contact-form')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    const button = this.querySelector('button');
    const originalText = button.textContent;
    
    if (name && email && message) {
        button.textContent = 'Sending...';
        button.disabled = true;
        
        try {
            const response = await fetch('https://formspree.io/f/YOUR_CONTACT_FORM_ID', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message })
            });
            
            if (response.ok) {
                button.textContent = '✓ Message Sent!';
                this.reset();
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 3000);
            }
        } catch (error) {
            console.error('Error:', error);
            button.textContent = originalText;
            button.disabled = false;
        }
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.feature-card, .consideration-card, .article-card, .tip, .faq-item, .story-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current FAQ
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn?.addEventListener('click', function() {
    navLinks.classList.toggle('active');
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks?.classList.remove('active');
    });
});

console.log('🌍 International Matchmaking website loaded successfully!');
