document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        timelineObserver.observe(item);
    });
    const aboutImage = document.querySelector('.about-image img');
    
    if (aboutImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            aboutImage.style.transform = `translateY(${scrollPosition * 0.1}px) scale(1.02)`;
        });
    }
    const skillBubbles = document.querySelectorAll('.skill-bubble');
    
    skillBubbles.forEach(bubble => {
        bubble.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
        });
        
        bubble.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
});