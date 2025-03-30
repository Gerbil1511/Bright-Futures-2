document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });

    // Print functionality for printables
    document.querySelectorAll('.print-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const printPath = this.getAttribute('data-print');
            const printWindow = window.open(printPath, '_blank');
            
            printWindow.onload = function() {
                printWindow.print();
            };
        });
    });

    // YouTube video enhancement
    const enhanceVideos = () => {
        const videoCards = document.querySelectorAll('#videos .card');
        
        videoCards.forEach(card => {
            // Add play button overlay
            const iframeContainer = card.querySelector('.ratio');
            const playButton = document.createElement('div');
            playButton.className = 'video-play-button';
            playButton.innerHTML = '<i class="fas fa-play"></i>';
            iframeContainer.appendChild(playButton);
            
            // Click to play/pause functionality
            card.addEventListener('click', function(e) {
                if (!e.target.closest('a')) { // Don't interfere with other clickable elements
                    const iframe = this.querySelector('iframe');
                    if (iframe) {
                        // Toggle play/pause by reloading the iframe
                        const src = iframe.src;
                        iframe.src = src.includes('autoplay=1') 
                            ? src.replace('autoplay=1', 'autoplay=0')
                            : src.includes('?') 
                                ? src + '&autoplay=1'
                                : src + '?autoplay=1';
                    }
                }
            });
        });
    };
    
    // Initialize video enhancements
    enhanceVideos();
});