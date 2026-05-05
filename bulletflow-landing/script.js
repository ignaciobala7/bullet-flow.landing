// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling for anchor links (fallback for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            if (document.body.classList.contains('light-theme')) {
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            } else {
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            }
        });
    }

    // Form Submission Logic
    const leadForm = document.getElementById('n8nLeadForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (leadForm) {
        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Disable button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
            formStatus.className = 'form-status';
            formStatus.textContent = '';

            const formData = new FormData(leadForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // Webhook de Producción de n8n
                const WEBHOOK_URL = 'https://n8n.clubdigitalstore.com/webhook/lead-capture';
                
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                
                if (!response.ok) throw new Error('Network response was not ok');

                formStatus.textContent = '¡Solicitud enviada con éxito! Nos pondremos en contacto pronto.';
                formStatus.classList.add('success');
                leadForm.reset();
            } catch (error) {
                formStatus.textContent = 'Hubo un error al enviar. Por favor, intenta de nuevo.';
                formStatus.classList.add('error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Solicitud';
            }
        });
    }
});
