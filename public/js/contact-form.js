document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            if (!name || !email || !phone || !subject || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            const baseURL = 'https://docs.google.com/forms/d/e/1FAIpQLScQIwFb8fm2ciRcECZIQBomITGNjcnTUb00P9UHq3n8CJ8qdg/formResponse';
            const params = new URLSearchParams();
            params.append('usp', 'pp_url');
            params.append('entry.30525179', name);
            params.append('entry.332920908', email);
            params.append('entry.2005378339', phone);
            params.append('entry.591358541', subject);
            params.append('entry.364893927', message);
            
            const redirectURL = `${baseURL}?${params.toString()}`;
            
            window.open(redirectURL, '_blank');
        });
    }
});
