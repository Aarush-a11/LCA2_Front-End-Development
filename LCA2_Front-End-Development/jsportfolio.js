document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    const portfolioLinks = document.querySelectorAll('.portfolio-overlay .btn');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    portfolioLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectItem = this.closest('.portfolio-item');
            const title = projectItem.querySelector('h3').textContent;
            const description = projectItem.querySelector('p').textContent;
            const imageSrc = projectItem.querySelector('img').src;
            modal.querySelector('.modal-body').innerHTML = `
                <img src="${imageSrc}" alt="${title}" style="width:100%; max-height:400px; object-fit:cover; border-radius:8px; margin-bottom:1.5rem;">
                <h2>${title}</h2>
                <p>${description}</p>
                <div style="margin-top:1.5rem;">
                    <a href="#" class="btn" style="margin-right:1rem;">View Project</a>
                    <a href="#" class="btn" style="background:transparent; border:2px solid var(--primary-color); color:var(--primary-color);">View Code</a>
                </div>
            `;
            modal.classList.add('active');
        });
    });
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            modal.classList.remove('active');
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
    const portfolioObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                portfolioObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    portfolioItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        portfolioObserver.observe(item);
    });
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow)';
        });
    });
});