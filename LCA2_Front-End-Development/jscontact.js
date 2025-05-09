document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const formGroups = document.querySelectorAll('.form-group');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                setError(nameInput.parentElement, 'Name is required');
                isValid = false;
            } else {
                clearError(nameInput.parentElement);
            }
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                setError(emailInput.parentElement, 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                setError(emailInput.parentElement, 'Please enter a valid email');
                isValid = false;
            } else {
                clearError(emailInput.parentElement);
            }
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                setError(messageInput.parentElement, 'Message is required');
                isValid = false;
            } else {
                clearError(messageInput.parentElement);
            }
            if (isValid) {
                showSuccessMessage();
            }
        });
        function setError(formGroup, message) {
            formGroup.classList.add('error');
            const errorElement = formGroup.querySelector('.error-message') || document.createElement('span');
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            if (!formGroup.querySelector('.error-message')) {
                formGroup.appendChild(errorElement);
            }
        }
        
        function clearError(formGroup) {
            formGroup.classList.remove('error');
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
        }
        
        function showSuccessMessage() {
            const existingSuccess = document.querySelector('.form-success');
            if (existingSuccess) {
                existingSuccess.style.display = 'block';
                return;
            }
            
            const successDiv = document.createElement('div');
            successDiv.className = 'form-success';
            successDiv.textContent = 'Your message has been sent successfully!';
            contactForm.insertBefore(successDiv, contactForm.firstChild);
            
            setTimeout(() => {
                successDiv.style.opacity = '0';
                setTimeout(() => {
                    successDiv.remove();
                }, 500);
            }, 3000);
        }
    }
    const infoItems = document.querySelectorAll('.info-item');
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    infoItems.forEach(item => {
        item.style.animationPlayState = 'paused';
        contactObserver.observe(item);
    });
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-3px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
});