document.addEventListener('DOMContentLoaded', function() {
    // Initialize the UI components
    initNavbar();
    initTabs();
    initAccordion();
    initCodeBlocks();
    initSmoothScroll();
    initAnimations();
});

// Navbar active state management
function initNavbar() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Set active link based on scroll position
    function setActiveLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Initial call and event binding
    setActiveLink();
    window.addEventListener('scroll', setActiveLink);
    
    // Click event for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = 'var(--hover-shadow)';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.boxShadow = 'var(--card-shadow)';
            navbar.style.backgroundColor = 'var(--card-bg)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Tab functionality
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab-btn').forEach(tb => tb.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(tp => tp.classList.remove('active'));
            
            // Add active class to current tab and content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Accordion functionality
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            
            // Toggle active class on the clicked item
            accordionItem.classList.toggle('active');
        });
    });
}

// Code block copy functionality
function initCodeBlocks() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeToCopy = this.getAttribute('data-clipboard-text');
            
            // Copy to clipboard
            navigator.clipboard.writeText(codeToCopy).then(() => {
                // Visual feedback
                this.textContent = 'Copied!';
                this.classList.add('copied');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.textContent = 'Copy';
                    this.classList.remove('copied');
                }, 2000);
            });
        });
    });
    
    // Add syntax highlighting effect
    const codeBlocks = document.querySelectorAll('.code-block pre code');
    codeBlocks.forEach(block => {
        // Simple syntax highlighting (for demonstration)
        const content = block.innerHTML;
        let highlighted = content
            // Comments
            .replace(/(\/\/.*)/g, '<span style="color: #6a9955;">$1</span>')
            // Strings
            .replace(/(['"`].*?['"`])/g, '<span style="color: #ce9178;">$1</span>')
            // Keywords
            .replace(/\b(function|class|extends|return|if|else|for|while|break|continue|const|let|var|new|this|import|export|from|try|catch|public|private|protected)\b/g, 
                     '<span style="color: #569cd6;">$1</span>')
            // Functions/methods
            .replace(/\b(\w+)(?=\()/g, '<span style="color: #dcdcaa;">$1</span>')
            // PHP specific
            .replace(/\b(Route|Schema|Blueprint|php|artisan)\b/g, 
                     '<span style="color: #4ec9b0;">$1</span>')
            // Special characters
            .replace(/(&lt;|&gt;|=&gt;|\{|\}|\(|\)|\[|\]|;|,|\.|:|=|\+|-|\*|\/)/g, 
                     '<span style="color: #d4d4d4;">$1</span>');
        
        block.innerHTML = highlighted;
    });
}

// Smooth scroll functionality
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate children with delay
                const elements = entry.target.querySelectorAll('.info-card, .feature-item, .step-card');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('animate');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add classes for initial animations
    document.querySelectorAll('.info-card, .feature-item, .step-card').forEach(el => {
        el.classList.add('will-animate');
    });
    
    // Add particles effect to header (luxury touch)
    initParticles();
}

// Luxury particles effect for header
function initParticles() {
    const header = document.querySelector('.header');
    
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.className = 'particles-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    // Insert canvas as first child of header
    header.insertBefore(canvas, header.firstChild);
    
    // Get context and set canvas dimensions
    const ctx = canvas.getContext('2d');
    canvas.width = header.offsetWidth;
    canvas.height = header.offsetHeight;
    
    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create particles array
    const particlesArray = [];
    const particleCount = Math.min(50, Math.floor(canvas.width * canvas.height / 10000));
    
    for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
    }
    
    // Animation function
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections between particles
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particlesArray.length; i++) {
            for (let j = i; j < particlesArray.length; j++) {
                const dx = particlesArray[i].x - particlesArray[j].x;
                const dy = particlesArray[i].y - particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                    ctx.stroke();
                }
            }
        }
        
        // Update and draw particles
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = header.offsetWidth;
        canvas.height = header.offsetHeight;
    });
    
    // Start animation
    animate();
}

// Add dark mode toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const footer = document.querySelector('.footer');
    
    // Create dark mode toggle
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = `
        <button class="theme-toggle-btn">
            <span class="light-icon">☀️</span>
            <span class="dark-icon">🌙</span>
        </button>
    `;
    
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.bottom = '20px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.style.zIndex = '1000';
    darkModeToggle.style.borderRadius = '50%';
    darkModeToggle.style.width = '50px';
    darkModeToggle.style.height = '50px';
    darkModeToggle.style.display = 'flex';
    darkModeToggle.style.justifyContent = 'center';
    darkModeToggle.style.alignItems = 'center';
    darkModeToggle.style.backgroundColor = 'var(--primary-color)';
    darkModeToggle.style.boxShadow = 'var(--card-shadow)';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.transition = 'all var(--transition-normal)';
    
    document.body.appendChild(darkModeToggle);
    
    // Handle dark mode toggle
    const toggleBtn = darkModeToggle.querySelector('.theme-toggle-btn');
    const lightIcon = darkModeToggle.querySelector('.light-icon');
    const darkIcon = darkModeToggle.querySelector('.dark-icon');
    
    // Set initial state based on system preference
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark-mode', prefersDarkMode);
    
    if (prefersDarkMode) {
        lightIcon.style.display = 'none';
        darkIcon.style.display = 'block';
    } else {
        lightIcon.style.display = 'block';
        darkIcon.style.display = 'none';
    }
    
    toggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark-mode');
        const isDarkMode = document.documentElement.classList.contains('dark-mode');
        
        if (isDarkMode) {
            lightIcon.style.display = 'none';
            darkIcon.style.display = 'block';
        } else {
            lightIcon.style.display = 'block';
            darkIcon.style.display = 'none';
        }
    });
    
    // Style the toggle button
    toggleBtn.style.border = 'none';
    toggleBtn.style.background = 'none';
    toggleBtn.style.color = 'white';
    toggleBtn.style.fontSize = '1.5rem';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.width = '100%';
    toggleBtn.style.height = '100%';
    toggleBtn.style.borderRadius = '50%';
    
    // Add hover effect
    darkModeToggle.addEventListener('mouseenter', () => {
        darkModeToggle.style.transform = 'scale(1.1)';
    });
    
    darkModeToggle.addEventListener('mouseleave', () => {
        darkModeToggle.style.transform = 'scale(1)';
    });
});