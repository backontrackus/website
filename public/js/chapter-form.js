document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const location = formData.get('location');
            const teamAddition = formData.get('teamAddition');
            const comments = formData.get('comments') || '';
            
            if (!name || !email || !phone || !location || !teamAddition) {
                alert('Please fill in all required fields.');
                return;
            }
            
            const googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSfQnlA1lSR-RkUw7od9-8qdaBTr6mojxGDzkNzMy0ySLVYhrw/formResponse';
            
            const params = new URLSearchParams();
            params.append('usp', 'pp_url');
            params.append('entry.1209674492', name);
            params.append('entry.37855220', email);
            params.append('entry.1875296044', phone);
            params.append('entry.551736735', location);
            params.append('entry.641435764', teamAddition);
            params.append('entry.662070976', comments);
            
            const redirectURL = `${googleFormURL}?${params.toString()}`;
            
            window.open(redirectURL, '_blank');
        });
    }
});
